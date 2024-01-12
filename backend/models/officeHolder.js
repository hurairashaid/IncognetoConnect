const mongoose = require("mongoose");

const officeHolderSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

const OfficeHolder = mongoose.model("OfficeHolder", officeHolderSchema)

module.exports = OfficeHolder;