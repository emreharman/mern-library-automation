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
        required: false
    },
    puslishDate: {
        type: String,
        required: false,
    },
    isbn: {
        type: String,
        required:false
    }
});
module.exports = mongoose.model("Book", bookSchema);