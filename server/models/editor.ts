import mongoose from "mongoose";


const editor = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    data: {
        type: Object
    }
});

editor.statics.build = (data) => {
    return new Editor(data);
}

const Editor = mongoose.model('Editor', editor);

export { Editor }