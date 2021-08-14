const router = require("express").Router()
const Book = require("../models/Book")
const isAuth=require("../permissions/isAuth")
const isManager = require("../permissions/isManager")
const mongoose = require("mongoose")


router.get("/", isAuth,async (req, res) => {
    try {
        const books = await Book.find({})
        res.json(books)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somethimg is wrong with server"})
    }
    

})

router.post("/add", isAuth, isManager,async (req, res) => {
    try {
        //validation
        if (!req.body.name) return res.status(400).json({ message: "Name field is require" })
        if (!req.body.author) return res.status(400).json({ message: "Author field is required" })
        //checking if book exists
        const bookExists = await Book.findOne({ name: req.body.name, author: req.body.author })
        if (bookExists) return res.status(400).json({ message: "Book is alredy exist." })
        const newBook = new Book({
            name: req.body.name,
            author: req.body.author,
            publisher: req.body.publisher,
            publishDate: req.body.publishDate,
            isbn: req.body.isbn
        })
        console.log(newBook)
        const savedBook = await newBook.save()
        res.json({message:"Book has added succesfully",data:savedBook})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something is wrong with server"})
    }
})

module.exports = router;