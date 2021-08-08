const jwt_decode = require("jwt-decode")

const isManager = (req, res, next) => {
     try {
        const token = req.headers.cookie.split("=")[1];
        if (!token) return res.json(false);
        const decodedJwt = jwt_decode(token)
        const role = decodedJwt.user.role;
         if (role === "manager") next()
         else return res.send(401, "Unauthorized");
    } catch (error) {
        res.json(false);
    }
}

module.exports = isManager;