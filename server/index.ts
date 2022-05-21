import { Server } from 'socket.io';
import { Editor } from './models/editor';

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
        const data = "";
        socket.join(documentId);
        socket.emit('load-document', data);

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });
    });
});

const findOrCreate = async (id: string) => {
    if (!id) return;

    const document = await Editor.findById(id);

    const newDocument = await Editor.build({
        _id: id,
        data: "",
    });

    newDocument.save();
    return newDocument;
}