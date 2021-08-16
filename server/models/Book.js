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
    publishDate: {
        type: String,
        required: false,
    },
    isbn: {
        type: String,
        required:false
    },
    img: {
        type: String,
        required: false,
        default: "https://via.placeholder.com/150"
    },
    userId: {
        type: String,
        required:true
    }
});
module.exports = mongoose.model("Book", bookSchema);