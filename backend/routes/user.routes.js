const express = require("express")
const router = express.Router()
const Controller = require("../controllers/user.controller")

router.get("/signup", Controller.userSignup)

module.exports = router;