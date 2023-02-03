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
        return res.status(200).json({
            errorcode: 0,
            status: true,
            message: "Data Submited Successfully",
            data: user
        })
    } catch (error) {
        return res.status(200).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }

}

exports.getUser = async (req, res) => {
    try {
        let userdata = await User.find({}).sort({ ceateAt: -1 })
        return res.status(200).json({
            errorcode: 0,
            status: true,
            message: "User Data Get Successfully",
            data: userdata
        })
    } catch (error) {
        return res.status(200).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let { id } = req.params
        let user = await User.findById(id)
        if (!user) return res.status(200).json({
            errorcode: 1,
            status: false,
            message: "user not found",
            data: user
        })
        await User.deleteOne({ _id: id })
        return res.status(200).json({
            errorcode: 0,
            status: true,
            message: "user delete successfully",
            data: null
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

exports.updateUser = async (req, res) => {
    try {
        let { id, name, email, phoneno } = req.body
        if (!id) return res.status(200).json({
            errorcode: 1,
            status: false,
            message: "user id should be present",
            data: null
        })
        let updateuser = await User.findById(id)
        if (!updateuser) return res.status(200).json({
            errorcode: 2,
            status: false,
            message: "user id not define",
            data: null
        })
        updateuser.name = name ? name : updateuser.name
        updateuser.email = email ? email : updateuser.email
        updateuser.phoneno = phoneno ? phoneno : updateuser.phoneno
        await updateuser.save()
        return res.status(200).json({
            errorcode: 0,
            stauts: true,
            message: "User Updated",
            data: null
        })
    } catch (error) {
        return res.status(200).json({
            errorcode: 3,
            stauts: false,
            message: error.message,
            data: error
        })
    }
}