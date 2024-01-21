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
        status : {
            type : String,
            default: "DEACTIVE",
            required : true ,
        },
        bannedReason :{
          type : String,
          default : "null",
          required :true
        }
    },
    { timestamp: true }
)


const studentUser = mongoose.model("Students", studentUserSchema)

module.exports = studentUser;
