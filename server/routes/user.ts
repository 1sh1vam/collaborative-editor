import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { currentUser } from '../middleware/current-user';
import { User } from '../models/users';
import { Password } from '../services/password';

const app = express.Router();

app.post(
  '/api/users/signup',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password length must be between 4 and 20 charecters'),
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
      name,
      email,
      password,
    });

    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

app.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').trim('').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const passwordMatches = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatches) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };
    res.send(existingUser);
  }
);

app.get('/api/users/currentUser', currentUser, async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.status(401).send({ message: 'Not authorized' });
  }

  res.send({ currentUser: req.currentUser || null });
});

app.post('/api/users/signout', currentUser,  async (req: Request, res: Response) => {
    req.session = null;

    res.send({});
});
