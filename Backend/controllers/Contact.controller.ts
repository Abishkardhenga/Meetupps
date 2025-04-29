import { AuthRequest } from '../middlewares/authMiddleware';
import Contact from '../models/Contact.model';


import { Request, Response } from 'express';

export const createContact = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { name, email, phone ,notes,birthday,tags,address} = req.body;
        console.log("request in create contact", req.user)
        const userId = req.user._id; // assuming you attach user to req after auth

        const newContact = new Contact({ name, email, phone, userId: userId,notes ,tags, birthday,address });
        await newContact.save();

        res.status(201).json({ message: 'Contact created successfully', contact: newContact,birthday });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all contacts for a user
export const getContacts = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const userId = req.user._id; // user ID from auth middleware
        const contacts = await Contact.find({ userId: userId });

        res.status(200).json({ contacts });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// View a specific contact by ID
export const getContactById = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { _id } = req.params;
        const contact = await Contact.findById(_id);

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
        const { _id } = req.params;
        const updatedData = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(_id, updatedData, { new: true });

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
        const { _id } = req.params;

        const deletedContact = await Contact.findByIdAndDelete(_id);

        if (!deletedContact) {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
