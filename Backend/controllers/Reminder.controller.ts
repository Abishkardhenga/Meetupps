import { Request, Response } from 'express';
import Reminder from '../models/Reminder.model';
import Contact from '../models/Contact.model';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { contactId, message, reminderDate, reminderType } = req.body;

    const reminder = new Reminder({
      userId: req.user._id,
      contactId,
      reminderType,
      reminderDate,
      message,
    });

    await reminder.save();

    res.status(201).json({ message: 'Reminder created successfully', reminder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getReminders = async (req: AuthRequest, res: Response) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id })
      .populate('contactId', 'name email');

    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const checkTodaysReminders = async (req: Request, res: Response) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const reminders = await Reminder.find({
      reminderDate: { $gte: startOfDay, $lte: endOfDay },
      isSent: false,
    }).populate('contactId', 'name email');

    for (const reminder of reminders) {
      const contact = reminder.contactId;

      const msg = reminder.message || `Reminder for ${reminder.reminderType}`;

      // TODO: Send email using contact.email or user's email

      reminder.isSent = true;
      await reminder.save();
    }

    res.status(200).json({ message: `${reminders.length} reminders processed.` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Delete reminder
export const deleteReminder = async (req: AuthRequest, res: Response) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.reminderId,
      userId: req.user._id,
    });

    if (!reminder) {
      res.status(404).json({ message: 'Reminder not found' });
      return;
    }

    res.status(200).json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update reminder
export const updateReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { message, reminderDate } = req.body;

    const reminder = await Reminder.findOne({
      _id: req.params.reminderId,
      userId: req.user._id,
    });

    if (!reminder) {
      res.status(404).json({ message: 'Reminder not found' });
      return;
    }

    reminder.message = message || reminder.message;
    if (reminderDate) reminder.reminderDate = reminderDate;

    await reminder.save();

    res.status(200).json({ message: 'Reminder updated', reminder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
