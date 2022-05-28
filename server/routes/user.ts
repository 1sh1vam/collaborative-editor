import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/users";
import { Password } from "../services/password";


const app = express.Router();

app.post('/api/users/signup', [
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
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

app.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim('')
        .notEmpty()
        .withMessage('Password is required')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() })
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).send({ message: 'Invalid credentials' });
    }

    const passwordMatches = await Password.compare(existingUser.password, password);

    if (!passwordMatches) {
        return res.status(400).send({ message: 'Invalid credentials' });
    }

    res.send(existingUser);
})