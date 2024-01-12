const mongoose = require("mongoose");

const issueSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        creator: {
            type: String,
            required:true,
        },
        upvotes: {
            type: Array,
        },
        status: {
            type: String,
            enum: ["RESOLVED", "UNRESOLVED"],
            default: "UNRESOLVED"
        },
        forwardVC: {
            type: Boolean,
            default: false
        },
        permittedBy: {
            type: String,
            default: "null",
            required : true
        },
        durationResolveInDays: {
            type: Number
        },
        category: {
            type: String,
            required: true
        },
        systemPart: {
            type: String,
            enum: ["ACTIVE", "DEACTIVE", "BANNED"],
            default: "DEACTIVE",
            required: true
        },
        deactivatedBy: {
            type: String,
            default: "null",
            required: true
        },
        resolveDescription: {
            type: String,
            default: "null",
            required: true
        },
        resolveby: {
            type: String,
            default: "null",
            required: true
        }
    },
    { timestamp: true }
)


const Issue = mongoose.model("Issue", issueSchema)

module.exports = Issue;
