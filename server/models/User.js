const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    surname: {
        type: String,
        required:true  
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    role: {
        type: String,
        default: "student"
    }
});

module.exports = mongoose.model("User", userSchema);