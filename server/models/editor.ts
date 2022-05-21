import mongoose from "mongoose";

interface EditorAttrs {
    _id: string,
    data: any;
}

interface EditorDoc extends mongoose.Document {
    data: any;
}

interface EditorModel extends mongoose.Model<EditorDoc> {
    build(attrs: EditorAttrs): EditorDoc;
}

const editor = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    data: {
        type: Object
    }
});

editor.statics.build = (attrs: EditorAttrs) => {
    return new Editor(attrs);
}

const Editor = mongoose.model<EditorDoc, EditorModel>('Editor', editor);

export { Editor }