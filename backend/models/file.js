
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    mimetype: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    uploaderName: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    size: {
        type: Number
    }

}, {timestamps: true});

const File = mongoose.model('File', fileSchema)
module.exports = File;