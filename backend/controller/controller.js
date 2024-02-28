const Issue = require("../models/issues");
const UnactiveIssues = async(req,res) => {
    let data = req.body;
    const myData = await Issue.find({systemPart : "DEACTIVE" , category : data.role} , "_id title description").exec();
    res.json(myData);
}

const ActivatedIssues = async(req,res) => {
    let data = req.body;
    const myData = await Issue.find({systemPart : "ACTIVE" , category : data.role} , "_id title description upvotes status forwardVC").exec();
    res.json(myData);
}

const ActivateIssue = async(req,res) => {
    let data = req.body;
    const myData = await Issue.findOneAndUpdate({_id : data.id}, {systemPart : "ACTIVE" , permittedBy : data.duetId });
    res.json(myData)
}


module.exports = {UnactiveIssues , ActivateIssue , ActivatedIssues};
