import { Socket } from "socket.io";
import { Editor } from "../models/editor";

const handleSocket =  async (socket: Socket) => {
    if(!socket.request.headers.cookie) {
        return socket.emit('error', { message: 'You are not logged in.' })
    }
    console.log('connected');
    socket.on('get-document', async (documentId: string) => {
        const document = await find(documentId);
        socket.join(documentId);
        if (!document) {
            socket.emit('error', { message: 'Document does not exist' })
        } else {
            socket.emit('load-document', document);
        }

        socket.on('send-changes', async (delta: any) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        socket.on('save-document', async (data: any) => {
            await Editor.findByIdAndUpdate(documentId, { data });
        });
    });
}

const find = async (id: string) => {
    try {
        if (!id) return;

        const document = await Editor.findById(id);
        return document;
    } catch(err) {
        console.log('error ', err);
        return;
    }
}

export { handleSocket };