const express = require("express");
const router = express.Router();
const {forwardedIssue, topIssues} = require("../controller/officeVC")

router.route("/forwardedIssue").get(forwardedIssue);
router.route("/topIssue").get(topIssues);


module.exports = router;