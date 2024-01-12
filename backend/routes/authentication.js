const express = require("express");
const router = express.Router();

const {staffAuthentication} = require("../controller/authentication")


router.route("/staff").post(staffAuthentication);

module.exports = router;