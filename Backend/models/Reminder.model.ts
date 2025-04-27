import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  reminderType: { type: String, enum: ['birthday', 'followup', 'custom'], required: true },
  reminderDate: { type: Date, required: true },
  message: { type: String },
  isSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Reminder = mongoose.model('Reminder', reminderSchema);
export default Reminder;
