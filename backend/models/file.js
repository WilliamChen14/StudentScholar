
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    fileType: {
        type: String,
        enum: ['pdf', 'docx'],
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    uploadersUsername: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    dateUploaded: {
        type: Date,
        required: true
    }

}, {timestamps: true});

const File = mongoose.model('File', fileSchema)
module.exports = File;