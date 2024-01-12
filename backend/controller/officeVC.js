const Issue = require("../models/issues");

const forwardedIssue = async(req,res) => {
    const myData = await Issue.find({ status: 'UNRESOLVED', forwardVC : true ,  systemPart : "ACTIVE"} , "_id title description upvotes category creator permittedBy").exec();
    res.json(myData);
}

const topIssues = async(req,res) => {
    const myData = await Issue.find({ status: 'UNRESOLVED', systemPart : "ACTIVE"} , "_id title description upvotes category creator permittedBy forwardVC").exec();
    res.json(myData);
}

const bannedIssues = async(req,res) => {
    const myData = await Issue.find({ status: 'UNRESOLVED', systemPart : "BANNED"} , "_id title description upvotes category creator permittedBy forwardVC deactivatedBy").exec();
    res.json(myData);
}

module.exports = {forwardedIssue , topIssues ,bannedIssues};
