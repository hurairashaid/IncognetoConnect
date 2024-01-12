const mongoose = require("mongoose");

// Sub Schema
const issueCreatedSchema = mongoose.Schema({
    issueID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }
})

const issueUpvotedSchema = mongoose.Schema({
    issueID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }
})

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        duetID: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        issueCreated: {
            type: [issueCreatedSchema]
        },
        issueUpvoted: {
            type: [issueUpvotedSchema]
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

const Student = mongoose.model("Student", studentSchema)

module.exports = Student;