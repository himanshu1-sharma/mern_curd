const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        trim: true,
        lowercase: true
    },
    phoneno: {
        type: String,
        default: null
    },
    created_ts: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("User", userSchema);