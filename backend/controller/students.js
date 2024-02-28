const Issue = require("../models/issues");

const topIssuesWindow = async (req, res) => {
  const myData = await Issue.find(
    { systemPart: "ACTIVE" , status : "UNRESOLVED"},
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
  console.log(creatorid)
  const myData = await Issue.find(
    { systemPart: "ACTIVE", creator: creatorid },
    "_id title description upvotes category forwardVC status resolveby resolveDescription"
  ).exec();
  res.json(myData);
};

const issueUpvotedWindow = async (req,res) => {
    const userId = req.body.userId;
    const myData = await Issue.find(
        { systemPart: "ACTIVE", upvotes: userId },
        "_id title description upvotes category forwardVC status resolvedBy resolveby resolveDescription"
      ).exec();
      res.json(myData);
}

const issueUnactive = async (req, res) => {
  const creatorid = req.query.creatorid;
  const myData = await Issue.find(
    { systemPart: "DEACTIVE", creator: creatorid },
    "_id title description category upvotes"
  ).exec();
  res.json(myData);
};

const issueBanned = async (req, res) => {
  const creatorid = req.query.creatorid;
  const myData = await Issue.find(
    { systemPart: "BANNED", creator: creatorid },
    "_id title description upvotes category forwardVC"
  ).exec();
  res.json(myData);
};

const createIssue = async (req, res) => {
  try {
    const creatorid = req.body.creatorid;
    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;
    
    const myData = new Issue({
      title: title,
      description: description,
      category: category,
      creator: creatorid
    });

    // Save the new issue to the database
    const savedIssue = await myData.save();

    res.status(201).json({
      success: true,
      issue: savedIssue
    });
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
};

const resolvedIssue = async (req, res) => {
  const myData = await Issue.find(
    { systemPart: "ACTIVE", status: "RESOLVED" },
    "_id title description upvotes category resolveby resolveDescription"
  ).sort({ "upvotes.length": -1 }).exec();
  res.json(myData);
};

module.exports = { topIssuesWindow, issueCreated , issueUpvote ,issueUnvote , issueUpvotedWindow , issueUnactive , issueBanned , createIssue ,resolvedIssue};
