import { Request, Response } from 'express';
import Reminder from '../models/Reminder.model'; // your Reminder mongoose model
import Contact from '../models/Contact.model'; // Contact model for birthdays
import protect, { AuthRequest } from "../middlewares/authMiddleware"

// Create a reminder
export const createReminder = async (req: AuthRequest, res: Response) => {
  try {
    const { contactId, message, remindAt } = req.body;

    const reminder = new Reminder({
      user: req.user._id, // From authMiddleware
      contact: contactId,
      message,
      remindAt,
    });

    await reminder.save();

    res.status(201).json({ message: 'Reminder created successfully', reminder });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// List all reminders
export const getReminders = async (req: AuthRequest, res: Response) => {
  try {
    const reminders = await Reminder.find({ user: req.user._id }).populate('contact', 'name email');
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Cron: Check today's birthdays
export const checkTodaysBirthdays = async (req: AuthRequest, res: Response) => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const birthdays = await Contact.find({
      user: req.user._id,
      birthdayMonth: month,
      birthdayDay: day,
    });

    res.status(200).json({ birthdays });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a reminder
export const deleteReminder = async (req: AuthRequest, res: Response) => {
  try {
    const reminderId = req.params.reminderId;

    const reminder = await Reminder.findOne({ _id: reminderId, user: req.user._id });

    if (!reminder) {
        res.status(404).json({ message: 'Reminder not found' });
        return;
    }

    await reminder.deleteOne();

      res.status(200).json({ message: 'Reminder deleted successfully' });
      return;
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
      return;
  }
};
