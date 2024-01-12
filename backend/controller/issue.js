const Issue = require("../models/issues");

const topIssues = async(req,res) => {
    const myData = await Issue.find({ status: 'UNRESOLVED', forwardVC : false ,  systemPart : "ACTIVE"} , "_id title description upvotes category").exec();
    res.json(myData);
}

const forwardToVC = async(req,res) => {
    const myData = await Issue.find({ status: 'UNRESOLVED', forwardVC : true ,  systemPart : "ACTIVE"} , "_id title description upvotes category").exec();
    res.json(myData);
}

const resolveIssue = async(req,res) => {
    const myData = await Issue.find({ status: 'RESOLVED', systemPart : "ACTIVE"} , "_id title description upvotes category").exec();
    res.json(myData);
}

const issueResolve = async(req,res) => {
    const id = req.body.id
    const resolveDescription = req.body.description;
    const resolveby = req.body.resolveBy;
    const myData = await Issue.findOneAndUpdate({_id : id}, {resolveDescription : resolveDescription , resolveby: resolveby , status : "RESOLVED"});
    res.json(myData)
}

const forwardVC = async(req,res) => {
    const myData = await Issue.findOneAndUpdate({_id : id}, {forwardVC : true});
    res.json(myData)
}

module.exports = {topIssues, forwardToVC , resolveIssue ,  issueResolve, forwardVC };
