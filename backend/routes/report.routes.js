const express = require("express")
const router = express.Router()
const Controller = require("../controllers/report.controller")

router.post("/report-user", Controller.reportUser)


module.exports = router