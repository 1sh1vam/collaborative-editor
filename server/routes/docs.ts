import express, { Request, Response } from 'express';
import { currentUser } from '../middleware/current-user';
import { Editor } from '../models/editor';

const app = express.Router();

app.post('/api/docs', currentUser, async (req: Request, res: Response) => {
    if (!req.currentUser) {
        return res.status(401).send({ message: 'Not authorized' });
    }

    const { id } = req.currentUser;

    const editor = Editor.build({
        data: "",
        owner: id,
    });
    await editor.save();

    res.status(201).send(editor);
});

