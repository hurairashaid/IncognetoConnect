const express = require("express");
const router = express.Router();

const {staffAuthentication, createStudent} = require("../controller/authentication")


router.route("/staff").post(staffAuthentication);
router.route("/studentSignUp").post(createStudent);

module.exports = router;