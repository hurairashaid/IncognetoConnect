const express = require("express");
const { UnactiveIssues, ActivateIssue ,ActivatedIssues} = require("../controller/controller");
const router = express.Router();


router.route("/unactiveIssues").post(UnactiveIssues);
router.route("/activateIssues").post(ActivateIssue);
router.route("/activatedIssues").post(ActivatedIssues);

module.exports = router;