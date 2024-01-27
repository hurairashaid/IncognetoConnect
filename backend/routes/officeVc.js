const express = require("express");
const router = express.Router();
const {forwardedIssue, topIssues , bannedIssues} = require("../controller/officeVC")

router.route("/forwardedIssue").get(forwardedIssue);
router.route("/topIssue").get(topIssues);
router.route("/bannedIssue").get(bannedIssues);


module.exports = router; 