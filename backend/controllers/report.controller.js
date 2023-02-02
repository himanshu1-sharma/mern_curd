const mongoose = require('mongoose')
const reportModel = require("../models/report.model")
const User = require("../models/user.model")
const ReportUserIssue = require("../models/reportUserIssue.model")

exports.reportUser = async (req, res) => {
    try {
        let { reportedBy, reportedUser, causeOfrepoart } = req.body
        console.log("req.body", req.body)
        let userReport = new reportModel({
            reportedBy: reportedBy,
            reportedUser: reportedUser,
            causeOfrepoart: causeOfrepoart
        })
        userReport = await userReport.save()
        return res.status(200).json({
            errorcode: 0,
            status: true,
            message: "Data Submited Successfully",
            data: userReport
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

exports.getReportUser = async (req, res) => {
    try {
        const ReporteUserData = await reportModel.find().populate([
            {
                path: "reportedBy",
                model: "User",
                select: "name email phoneno",
            },
            {
                path: "reportedUser",
                model: "User",
                select: "name email phoneno"
            }
           
        ])
        if (!ReporteUserData) return res.status(200).json({
            errorcode: 1,
            status: false,
            message: "data not found",
            data: null
        })

        return res.status(200).json({
            errorcode: 0,
            status: true,
            message: "reported data found",
            data: ReporteUserData
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