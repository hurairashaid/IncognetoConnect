const mongoose = require("mongoose");

url="mongodb+srv://daniyalghani159:uFa7R6eI657uOaDi@cluster0.tokelxu.mongodb.net/Anonymous?retryWrites=true&w=majority"
const connectDB = () => {
    console.log("we are in database")
    return mongoose.connect(url, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    });
}

module.exports = connectDB

