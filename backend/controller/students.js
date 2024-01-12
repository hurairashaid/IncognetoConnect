const Issue = require("../models/issues");

const topIssuesWindow = async (req, res) => {
  const myData = await Issue.find(
    { systemPart: "ACTIVE" },
    "_id title description upvotes category forwardVC"
  ).exec();
  res.json(myData);
};

const issueUpvote = async (req, res) => {
  const id = req.body.id;
  const studentId = req.body.studentId;
  const myData = await Issue.findOneAndUpdate(
    { _id: id },{ $push: { upvotes: studentId } }
  );
  res.json(myData);
};

const issueUnvote = async(req,res) => {
    const id = req.body.id;
    const studentId = req.body.studentId;
    const myData = await Issue.findOneAndUpdate(
      { _id: id },{ $pull: { upvotes: studentId } }
    );
    res.json(myData);
}


const issueCreated = async (req, res) => {
  const creatorid = req.query.creatorid;
  const myData = await Issue.find(
    { systemPart: "ACTIVE", creator: creatorid },
    "_id title description upvotes category forwardVC"
  ).exec();
  res.json(myData);
};

const issueUpvotedWindow = async (req,res) => {
    const userId = req.body.userId;
    const myData = await Issue.find(
        { systemPart: "ACTIVE", upvotes: userId },
        "_id title description upvotes category forwardVC"
      ).exec();
      res.json(myData);
}

module.exports = { topIssuesWindow, issueCreated , issueUpvote ,issueUnvote , issueUpvotedWindow};
