const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Class = require("./class.js")
const File = require("./file.js")

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    userClasses: [{
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    }],
    userFiles: [{
        type: Schema.Types.ObjectId,
        ref: 'File',
        required: true
    }]

}, {timestamps: true}
);

const User = mongoose.model('User', userSchema);
module.exports = User;