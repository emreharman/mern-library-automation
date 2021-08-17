const router = require("express").Router()
const Book = require("../models/Book")
const jwt = require("jsonwebtoken");

//get all books
router.get("/", async (req, res) => {
    try {        
        //get all books
        const books=await Book.find({})
        res.json(books)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something is wrong with server"})
    }
})
//get specific book
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id)
        //find book
        const book = await Book.findById(id)
        if (!book) return res.status(404).json({ message: "Couldn't find the book" })
        res.json(book)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something is wrong with server"})
    }
    
})
//update a book
router.put("/:id", async (req, res) => {
    try {
        //verify token and check role
        const token = req.body.token
        const verified = await jwt.verify(token, process.env.JWT_SECRET)
        if (verified.user.role != "manager") {
           return res.status(401).json({message:"You're not authorized."})
        }
        const id = req.params.id
        const newBook = {
            _id: id,
            name: req.body.name,
            author: req.body.author,
            publisher: req.body.publisher,
            publishDate: req.body.publishDate,
            isbn: req.body.isbn,
            img: req.body.img,
            userId: req.body.userId
        }
        const updatedBook = await Book.findByIdAndUpdate(id, newBook)
        res.json({message:"Book updated successfully",updatedBook})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something is wrong with server"})
    }
})
//add book route
router.post("/add", async (req, res) => {
    try {
        //verify token and check role
        const token = req.body.token
        const verified = await jwt.verify(token,process.env.JWT_SECRET)
        if (verified.user._id != req.body.userId && verified.user.role != "manager") {
           return res.status(401).json({message:"You're not authorized."})
        }
        //validation
        if (!req.body.name) return res.status(400).json({ message: "Name field is require" })
        if (!req.body.author) return res.status(400).json({ message: "Author field is required" })
        //checking if book exists
        const bookExists = await Book.findOne({ name: req.body.name, author: req.body.author })
        if (bookExists) return res.status(400).json({ message: "Book is alredy exist." })
        let img = req.body.img
        if(img === "") img="https://via.placeholder.com/150"
        const newBook = new Book({
            name: req.body.name,
            author: req.body.author,
            publisher: req.body.publisher,
            publishDate: req.body.publishDate,
            isbn: req.body.isbn,
            img,
            userId:req.body.userId
        })
        //console.log(newBook)
        const savedBook = await newBook.save()
        res.json({message:"Add book is succesfull",savedBook})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something is wrong with server"})
    }
})
//delete book route
router.delete("/:id/:token", async (req, res) => {
    try {
        //check for token
        const token = req.params.token
        if(!token) return res.status(401).json({message:"You're not authorized"})
        const verified = await jwt.verify(token, process.env.JWT_SECRET)
        if (verified.user.role !== "manager") return res.status(401).json({ message: "You're not authorized" })
        const id = req.params.id
        const deletedBook = await Book.findByIdAndDelete(id)
        res.json({message:"Delete is successfull",deletedBook})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something is wrong with server",error})
    }
})

module.exports = router;