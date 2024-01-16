const express = require("express");
const router = express.Router();
const {issueCreated, topIssuesWindow , issueUpvote ,issueUnvote , issueUpvotedWindow , issueUnactive , issueBanned, createIssue} = require("../controller/students")

router.route("/topIssues").get(topIssuesWindow);
router.route("/issueCreated").get(issueCreated);
router.route("/issueUpvote").post(issueUpvote);
router.route("/issueUnvote").post(issueUnvote);
router.route("/issueUpvotedWindow").post(issueUpvotedWindow);
router.route("/issueUnactive").post(issueUnactive);
router.route("/issueBanned").post(issueBanned);
router.route("/createIssue").post(createIssue);


module.exports = router;