import express from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
} from '../controllers/Contact.controller';
import protect from '../middlewares/authMiddleware'; // Import auth middleware

const router = express.Router();

// Routes
router.post('/contacts/create', protect, createContact);
router.get('/contacts/list', protect, getContacts);
router.get('/contacts/view/:_id', protect, getContactById);
router.put('/contacts/update/:_id', protect, updateContact);
router.delete('/contacts/delete/:_id', protect, deleteContact);

export default router;
