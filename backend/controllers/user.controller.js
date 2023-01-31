const mongoose = require("mongoose");
const User = require("../models/user.model")

exports.userSignup = async (req, res) => {
    try {
        let { name, email, phoneno } = req.body;
        let user = new User({
            name,
            email,
            phoneno
        })
        user = await user.save();
        console.log("user", user)
    } catch (error) {
        console.log(error)
    }

}