const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const bodyparser = require('body-parser');
var router = express()
require("dotenv").config();
const { DB_CONNECT, PORT } = process.env;
const userRouter = require("./routes/user.routes")
const issueRouter = require("./routes/reportUserIssue.routes")
const reportRouter = require("./routes/report.routes")

app.use(express.json())
app.use(cors());


//db connect
mongoose.connect(DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.once("open", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.log("Disonnected to MongoDB"));
db.on("reconnected", () => console.log("Reconnected to MongoDB"));
db.on("error", (err) => console.log(err));


//routes
router.use(bodyparser.json())
app.use("/api/user", userRouter)
app.use("/api/issue", issueRouter)
app.use("/api/report", reportRouter)


app.listen(PORT, () => {
    console.log(`app in running on ${PORT} port`)
})