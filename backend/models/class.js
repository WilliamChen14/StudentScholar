const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const File = require("./file.js")

const classSchema = new Schema({
    className: {
        type: String,
        required: true
    },
    classID: {
        type: String,
        required: true
    },
    classProf: {
        type: String,
        required: true
    },
    classConversation: {
        type: [String],
        required: true // start with empty array when init
        // for now, let's have notes be an array of strings
        // This means that the conversation of notes will be like a group chat (without the name of the user posted or the date posted)
    }, 
    classFiles: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }]

}, {timestamps: true});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
