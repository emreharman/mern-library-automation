const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    author: {
        type: String,
        required:true  
    },
    publisher: {
        type: String,
        required: true
    },
    puslishDate: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model("Book", bookSchema);