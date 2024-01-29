const mongoose = require("mongoose");

const studentUserSchema = mongoose.Schema(
    {
        duetId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true,
        },
        Role: {
            type: String,
            required:true,
        },
        passwords: {
            type: Array,
            default:[]
        },
        otp: {
            type: String,
            default: "null",
            required: true
        },
        issueCreated: {
            type: Array
        },
        issueUpvoted: {
            type: Array
        },
        status: {
            type: String,
            enum: ["ACTIVE", "DEACTIVE", "BANNED"],
            default: "ACTIVE"
        },
        bannedReason: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
)


const studentUser = mongoose.model("Students", studentUserSchema)

module.exports = studentUser;
