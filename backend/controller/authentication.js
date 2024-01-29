const officeHolder = require("../models/officeHolder");
const studentUser = require("../models/student");

const staffAuthentication = async (req, res) => {
  let data = req.body;
  const myData = await officeHolder
    .find(
      { name: data.name, password: data.password },
      "name position category"
    )
    .exec();
  res.json({ response: myData });
};

const createStudent = async (req, res) => {
  const email = req.body.email;
  const existUsername = await studentUser.findOne({ email: email }).exec();
  res.json({ response: existUsername });

//   if (existUsername) {
//     rss.json()
//   }else{

//   try {
//     const creatorid = req.body.creatorid;
//     const title = req.body.title;
//     const description = req.body.description;
//     const category = req.body.category;

//     const myData = new Issue({
//       title: title,
//       description: description,
//       category: category,
//       creator: creatorid,
//     });

//     // Save the new issue to the database
//     const savedIssue = await myData.save();

//     res.status(201).json({
//       success: true,
//       issue: savedIssue,
//     });
//   } catch (error) {
//     console.error("Error creating issue:", error);
//     res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//     });
//   }}
}

const studentAuthentication = async (req, res) => {
  let data = req.body;
  console.log(data)
  const myData = await studentUser
    .find(
      { duetId: data.duetid, Password: data.password },
      "name department status duetId"
    )
    .exec();
  res.json({ response: myData });
};

module.exports = { staffAuthentication, createStudent , studentAuthentication};
