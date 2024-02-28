const express = require("express");
const router = express.Router();
const {issueCreated, topIssuesWindow , issueUpvote ,issueUnvote , issueUpvotedWindow , issueUnactive , issueBanned, createIssue , resolvedIssue} = require("../controller/students")

router.route("/topIssues").get(topIssuesWindow);  //done
router.route("/issueCreated").get(issueCreated);  //done
router.route("/issueUpvote").post(issueUpvote);   //done
router.route("/issueUnvote").post(issueUnvote);   //done
router.route("/issueUpvotedWindow").post(issueUpvotedWindow); //done
router.route("/issueUnactive").get(issueUnactive); //done
router.route("/issueBanned").get(issueBanned); //done
router.route("/createIssue").post(createIssue);
router.route("/resolvedIssue").get(resolvedIssue);


module.exports = router;