const router = require("express").Router();
const User = require("../models/User");
const mailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//registering a user
router.post("/register", async (req, res) => {
    try {
        //validation
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.surname) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }
        if (req.body.password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }
        if (!mailValidator.validate(req.body.email)) {
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
        res.json({ message: "Register is successful.", email: savedUser.email, name: savedUser.name, surname: savedUser.surname });
    } catch (error) {
        res.status(500).json({ message: "Something is wrong with server." });
    }
});
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
        if (!mailValidator.validate(req.body.email)) {
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
        //now set cookie
        res.cookie("token", token, {
            httpOnly: true
        }).json({ message: "Login is successful.", role: userExist.role });
    } catch (error) {
        res.status(500).json({ message: "Something is wrong with server." });
    }
});

//logout router
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).json({ message: "Succesfully logged out." });
})

//isAuth
router.get("/is-auth", (req, res) => {
    
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);
        jwt.verify(token, process.env.JWT_SECRET)
        res.json(true);
    } catch (error) {
        res.json(false);
    }
})
module.exports = router;