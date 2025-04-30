import express from 'express';
import authenticateUser from '../middlewares/authMiddleware'; // Import auth middleware
import { checkTodaysReminders, createReminder, deleteReminder, getReminders, updateReminder } from '../controllers/Reminder.controller';
const router = express.Router();

router.post('/reminders/create', authenticateUser, createReminder);

router.get('/reminders/list', authenticateUser, getReminders);

router.post('/reminders/check-events', authenticateUser, checkTodaysReminders);

router.delete('/reminders/delete/:reminderId', authenticateUser, deleteReminder );


router.put('/reminders/update/:reminderId', authenticateUser , updateReminder)
export default router;
