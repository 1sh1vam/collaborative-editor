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

app.patch('/api/docs', currentUser, async (req: Request, res: Response) => {
    if (!req.currentUser) {
        return res.status(401).send({ message: 'Not authorized' });
    }

    const { id } = req.currentUser;
    const { name } = req.body;

    const editor = await Editor.findOne({ owner: id }).exec();
    if (!editor) {
        return res.status(400).send({ message: 'Not found' });
    }
    editor.name = name;
    await editor.save();

    res.status(201).send(editor);
});

app.get('/api/docs', currentUser, async (req: Request, res: Response) => {
    if (!req.currentUser) {
        return res.status(401).send({ message: 'Not authorized' });
    }

    const { id } = req.currentUser;

    const docs = await Editor.find({ owner: id })

    res.send(docs);
});

export { app as editorRoute }