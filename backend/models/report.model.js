const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reportSchema = new Schema({
    reportedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    reportedUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    causeOfrepoart: {
        type: String,
        default: null
    },
    create_ts: {
        type: Date,
        default: Date.now
    }

})

reportSchema.index({ create_ts: -1 })

module.exports = mongoose.model("Report", reportSchema)