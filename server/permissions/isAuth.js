
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    try {
        const token = req.headers.cookie.split("=")[1];
        if (!token) return res.json(false);
        jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch (error) {
        console.log("catch blog")
        res.json(false);
    }
}

module.exports = isAuth;