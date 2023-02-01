const express = require("express")
const router = express.Router()
const Controller = require("../controllers/user.controller")

router.post("/signup", Controller.userSignup)
router.get("/get-user", Controller.getUser)
router.delete("/delete-user", Controller.deleteUser)
router.post("/update-user", Controller.updateUser)

module.exports = router;