import { AuthRequest } from '../middlewares/authMiddleware';
import Contact from '../models/Contact.model';


import { Request, Response } from 'express';

export const createContact = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { name, email, phone } = req.body;
        const userId = req.user._id; // assuming you attach user to req after auth

        const newContact = new Contact({ name, email, phone, user: userId });
        await newContact.save();

        res.status(201).json({ message: 'Contact created successfully', contact: newContact });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all contacts for a user
export const getContacts = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const userId = req.user._id; // user ID from auth middleware
        const contacts = await Contact.find({ user: userId });

        res.status(200).json({ contacts });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// View a specific contact by ID
export const getContactById = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { contactId } = req.params;
        const contact = await Contact.findById(contactId);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ contact });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update a specific contact
export const updateContact = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { contactId } = req.params;
        const updatedData = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(contactId, updatedData, { new: true });

        if (!updatedContact) {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }

        res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a specific contact
export const deleteContact = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { contactId } = req.params;

        const deletedContact = await Contact.findByIdAndDelete(contactId);

        if (!deletedContact) {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
