const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT || 3004;


//connecting db and listening server
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true,useUnifiedTopology: true },() => {
    app.listen(PORT, () => console.log(`DB Connection is ok and listening on port 3004`));
})
//middlewares
app.use(express.json());
app.use(cors(
    {origin:[`http://localhost:3000`],credentials:true}
));
app.use("/user", require("./routes/userRoutes"));
app.use("/books", require("./permissions/isAuth"),require("./routes/bookRoutes"));
//routes
app.get("/", (req, res) => {
    res.send("Welcome to my first MERN Stack app.");
})