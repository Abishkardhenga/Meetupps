import express from 'express';
import { createReminder, getReminders, checkTodaysBirthdays, deleteReminder } from '../controllers/Reminder.controller';
import authenticateUser from '../middlewares/authMiddleware'; // Import auth middleware
const router = express.Router();

router.post('/reminders/create', authenticateUser, createReminder);

router.get('/reminders/list', authenticateUser, getReminders);

router.post('/reminders/check-birthdays', authenticateUser, checkTodaysBirthdays);

router.delete('/reminders/delete/:reminderId', authenticateUser, deleteReminder );

export default router;
