const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    discription: {
        type: String,
        required: true
    },
    file: {
        data: Buffer,
        contentType: String,
        required: true
    }
}, {timestamps: true}
);

const File = mongoose.model('File', fileSchema);
module.exports = File;