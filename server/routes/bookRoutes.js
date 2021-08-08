const router = require("express").Router()
const Book = require("../models/Book")
const isAuth=require("../permissions/isAuth")
const isManager=require("../permissions/isManager")

router.get("/", isAuth,isManager, (req, res) => {
    console.log("Im here")
    res.send("There will be listed books");
})

module.exports = router;