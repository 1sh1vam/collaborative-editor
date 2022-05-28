import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/users";


const app = express.Router();

app.post('/api/users/signup', [
    body('name')
        .notEmpty(),
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password length must be between 4 and 20 charecters')
],
async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).send({ message: 'Email is use' });
    }

    const user = User.build({
        name, email, password
    });

    await user.save();

    res.status(201).send()
});

