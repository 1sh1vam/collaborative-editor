import { Socket } from "socket.io";
import { Editor } from "../models/editor";

const handleSocket =  async (socket: Socket) => {
    console.log('connected');
    socket.on('get-document', async (documentId: string) => {
        const document = await find(documentId);
        socket.join(documentId);
        if (!document) {
            socket.emit('error', { message: 'Document does not exist' })
        } else {
            socket.emit('load-document', document!.data);
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
    if (!id) return;

    const document = await Editor.findById(id);
    if (document) return document;
}

export { handleSocket };