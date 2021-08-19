const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const emailValidator = require("email-validator")
const jwt = require("jsonwebtoken");

//Register route
router.post("/register", async (req, res) => {
    try {
        //validation
        if (!req.body.name || !req.body.surname || !req.body.password || !req.body.email) {
            return res.status(400).json({message:"Please fill all required fields."})
        }
        if (req.body.password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }
        if (!emailValidator.validate(req.body.email)) {
            return res.status(400).json({ message: "Email address must valid. Ex: abc@abc.com" });
        }
        //checking if user exist
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({ message: "Email address is already exist." });
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //saving user
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.json({ message: "Register is successful.", savedUser });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something is wrong with server",error})
    }
})

//login router
router.post("/login", async (req, res) => {
    try {
        //validation
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }
        if (req.body.password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }
        if (!emailValidator.validate(req.body.email)) {
            return res.status(400).json({ message: "Email address must valid. Ex: abc@abc.com" });
        }
        //check if user exists
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist) {
            return res.status(401).json({ message: "Email or password is wrong" });
        }
        //if user exist, compare password
        const isPassword = await bcrypt.compare(req.body.password, userExist.password);
        if (!isPassword) {
            return res.status(401).json({ message: "Email or password is wrong" });
        }
        //now create and sign a jwt
        const token = jwt.sign({
            user: {
                _id: userExist._id,
                email: userExist.email,
                role: userExist.role
            }
        }, process.env.JWT_SECRET);
        res.json({ message: "Login is successful.", role: userExist.role,userId:userExist._id,token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something is wrong with server.",error });
    }
});
//get all users
router.get("/:token", async (req, res) => {
    try {
        //verify token
        const token = req.params.token
        if (!token) res.status(401).json({ message: "You're not authorized" })
        const verified = await jwt.verify(token, process.env.JWT_SECRET)
        if (verified.user.role !== "manager") res.status(401).json({ message: "You're not authorized" })
        //find and send users
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something is wrong with server.",error });
    }
})
// update an user
router.put("/update/:id/:token", async (req, res) => {
    try {
        //console.log(req.body)
        const token = req.params.token
        if (!token) res.status(401).json({ message: "You're not authorized" })
        const verified = await jwt.verify(token, process.env.JWT_SECRET)
        if (verified.user.role !== "manager") res.status(401).json({ message: "You're not authorized" })
        const id = req.params.id
        //console.log(newUser)
        const updatedUser = await User.findByIdAndUpdate(id, req.body)
        res.json({message:"User updated successfully",updatedUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something is wrong with server.",error });
    }
    
})
// delete an user
router.delete("/delete/:id/:token", async (req, res) => {
    try {
        const token = req.params.token
        if (!token) res.status(401).json({ message: "You're not authorized" })
        const verified = await jwt.verify(token, process.env.JWT_SECRET)
        if (verified.user.role !== "manager") res.status(401).json({ message: "You're not authorized" })
        const id = req.params.id
        const deletedUser = await User.findByIdAndDelete(id)
        res.json({message:"Delete is successfull",deletedUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something is wrong with server.",error });
    }
})
module.exports = router;