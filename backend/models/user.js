const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Class = require("./class.js")
const File = require("./file.js")

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    userClasses: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    userFiles: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }]

}, {timestamps: true}
);

const User = mongoose.model('User', userSchema);
module.exports = User;