import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import validateEmail from '../config/validateEmail';
import generateToken from '../config/generateToken';

// Fix the return type here
export const register = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password } = req.body;

    if (!validateEmail(email)) {
        res.status(400).json({ message: 'Invalid email format' });
        return;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
        return;
    }
};

// Update the login function return type to match
export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    console.log("into the backend login")

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const user = await User.findOne({ email });
        console.log("user", user)
        if (!user) {
             res.status(400).json({ message: 'User not found' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user._id);

        res.cookie("user_info", token, {
           httpOnly: true,
  secure: false, // true if using HTTPS
  path: '/',
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  sameSite:"none"
            
            // Set to true in production
         }).status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
         });
        return
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
        return;
    }
};