const officeHolder = require("../models/officeHolder");

const staffAuthentication = async(req,res) => {
    let data = req.body;
    const myData = await officeHolder.find({name: data.name , password: data.password }  , 'name position category').exec();
    res.json({response : myData});
}

const getAllProductsTesting = async(req,res) => {
    res.json({testmsg : "We are in testing phase"});
}

module.exports = {staffAuthentication, getAllProductsTesting};
