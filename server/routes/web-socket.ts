import { Socket } from "socket.io";
import { Editor } from "../models/editor";

const handleSocket =  async (socket: Socket) => {
    console.log('connected');
    socket.on('get-document', async (documentId: string) => {
        const document = await findOrCreate(documentId);
        socket.join(documentId);
        socket.emit('load-document', document!.data);

        socket.on('send-changes', async (delta: any) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        socket.on('save-document', async (data: any) => {
            const editor = await Editor.findById(documentId);
            await Editor.findByIdAndUpdate(documentId, { data });
        });
    });
}

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

export { handleSocket };