const express = require("express")
const router = express.Router()
const Controller = require("../controllers/reportUserIssue.controller")

router.post("/reportUserIssue", Controller.reportUserIssueAdd)

module.exports = router;