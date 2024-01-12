const express = require("express");
const router = express.Router();

const {issueResolve,forwardVC , topIssues , forwardToVC , resolveIssue} = require("../controller/issue")


router.route("/topIssuesWindow").get(topIssues);
router.route("/forwardToVCWindow").get(forwardToVC);
router.route("/resolveIssueWindow").get(resolveIssue);
router.route("/issueResolve").post(issueResolve);
router.route("/forwardVC").get(forwardVC);


module.exports = router;