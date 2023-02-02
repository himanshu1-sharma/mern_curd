const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reportUserIssueSchema = new Schema({
    issueName: {
        type: String,
        default: null
    }
})

reportUserIssueSchema.index({ create_ts: -1 })

module.exports = mongoose.model("ReportUserIssue", reportUserIssueSchema)