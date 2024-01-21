const express = require("express");
const router = express.Router();

const {issueResolve,forwardVC , topIssues , forwardToVC , resolveIssue} = require("../controller/issue")


router.route("/topIssuesWindow").post(topIssues);
router.route("/forwardToVCWindow").post(forwardToVC);
router.route("/resolveIssueWindow").post(resolveIssue);
router.route("/issueResolve").post(issueResolve);
router.route("/forwardVC/").get(forwardVC);


module.exports = router;