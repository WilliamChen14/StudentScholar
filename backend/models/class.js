const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    professor: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
        // for now, let's have notes be an array of strings
        // This means that the conversation of notes will be like a group chat (without the name of the user posted or the date posted)
    }

}, {timestamps: true});
