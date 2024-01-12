const express = require("express");
const router = express.Router();
const {issueCreated, topIssuesWindow , issueUpvote ,issueUnvote , issueUpvotedWindow} = require("../controller/students")

router.route("/topIssues").get(topIssuesWindow);
router.route("/issueCreated").get(issueCreated);
router.route("/issueUpvote").post(issueUpvote);
router.route("/issueUnvote").post(issueUnvote);
router.route("/issueUpvotedWindow").post(issueUpvotedWindow);


module.exports = router;