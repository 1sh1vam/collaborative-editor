import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { Editor } from './models/editor';


mongoose.connect('mongodb://localhost/google-docs');

const io = new Server(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('get-document', async (documentId) => {
        const document = await findOrCreate(documentId);
        socket.join(documentId);
        socket.emit('load-document', document!.data);

        socket.on('send-changes', async (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        socket.on('save-document', async (data) => {
            const editor = await Editor.findById(documentId);
            await Editor.findByIdAndUpdate(documentId, { data });
        });
    });
});

const findOrCreate = async (id: string) => {
    if (!id) return;

    const document = await Editor.findById(id);
    if (document) return document;

    const newDocument = Editor.build({
        _id: id,
        data: "",
    });

    await newDocument.save();
    return newDocument;
}