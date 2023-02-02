const ReportUserIssue = require("../models/reportUserIssue.model")

exports.reportUserIssueAdd = async (req, res) => {
    try {
        let { issueName } = req.body
        let reportUserIssue = new ReportUserIssue({
            issueName
        })
        reportUserIssue = await reportUserIssue.save()
        return res.status(200).json({
            errorcode: 0,
            status: true,
            message: "report user issue name add successfully",
            data: reportUserIssue
        })
    } catch (error) {
        return res.status(200).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: null
        })
    }
}