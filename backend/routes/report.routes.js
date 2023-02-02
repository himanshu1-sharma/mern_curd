const express = require("express")
const router = express.Router()
const Controller = require("../controllers/report.controller")

router.post("/report-user", Controller.reportUser)
router.get("/get-report-user", Controller.getReportUser)


module.exports = router