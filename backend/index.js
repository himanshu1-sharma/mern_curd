const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const bodyParser = require("body-parser")
require("dotenv").config();
const { DB_CONNECT, PORT } = process.env;
const userRouter = require("./routes/user.routes")

app.use(express.json())

//db connect
mongoose.connect(DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("Disonnected to MongoDB"));
db.on("reconnected", () => console.log("Reconnected to MongoDB"));
db.on("error", (err) => console.log(err));


//routes

app.use("/api/user", userRouter)


app.listen(PORT, () => {
    console.log(`app in running on ${PORT} port`)
})