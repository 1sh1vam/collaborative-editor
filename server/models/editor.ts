import mongoose from "mongoose";

interface EditorAttrs {
    name: string;
    data: any;
    owner: string;
}

interface EditorDoc extends mongoose.Document {
    data: any;
    owner: string;
    name: string;
}

interface EditorModel extends mongoose.Model<EditorDoc> {
    build(attrs: EditorAttrs): EditorDoc;
}

const editor = new mongoose.Schema({
    data: {
        type: Object
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

editor.statics.build = (attrs: EditorAttrs) => {
    return new Editor(attrs);
}

const Editor = mongoose.model<EditorDoc, EditorModel>('Editor', editor);

export { Editor }