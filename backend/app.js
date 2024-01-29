const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./database/connect");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const officeHolder = require("./models/officeHolder");
const PORT = 2000;

const issue_routes = require("./routes/issue")
const authentication_routes = require("./routes/authentication")
const officeVC_routes = require("./routes/officeVc")
const students_routes = require("./routes/students")

app.get("/", (req, res) => {
    res.send("Welcome to anonymous app");
})


//middleware or to set router
app.use(cors())
app.use("/api/issue" , issue_routes)
app.use("/api/authentication" , authentication_routes)
app.use("/api/officeVC" , officeVC_routes )
app.use("/api/students" ,students_routes )


const start = async () => {
    try {
        await connectDB();
        app.listen(2000, console.log(`server is running at http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start();


