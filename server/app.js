const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const PORT = process.env.PORT || 3004

//connecting db and listening server
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    app.listen(PORT,() => console.log(`DB Connection is ok, listening port:${PORT}`))
})

//middlewares
app.use(express.json())
app.use(cors(
    {origin:[`http://localhost:3000`],credentials:true}
));

//routes
app.use("/user", require("./routes/userRoutes"))
app.use("/book", require("./routes/bookRoutes"))

app.get("/", (req, res) => {
    res.send("Welcome to my MERN stack library automation API")
})