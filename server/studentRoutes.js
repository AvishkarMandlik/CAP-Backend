const express = require("express");
const { connect, disconnect } = require("./mongoConn.js");
const Router = express.Router();
const bodyParser = require("body-parser");
Router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
Router.use(bodyParser.json({ limit: "50mb" }));

Router.post("/checkAdmission", async (req, res) => {
  const db = await connect();
  const collection = db.collection("Admissions");

  const admission = await collection.findOne({ email: req.body.email });
  await disconnect();
  if (admission) {
    if (admission.verify) {
      res.json({ status: true, verify: true });
    } else {
      res.json({ status: true, verify: false });
    }
  } else {
    res.json({ status: false });
  }
});

Router.post("/newAdmission", async (req, res) => {
  try {
    const db = await connect();
    const admissionsCollection = db.collection("Admissions");
    const counterCollection = db.collection("Counters");

    // Increment the counter and get updated value
    const counter = await counterCollection.findOneAndUpdate(
      { label: "counter" },
      { $inc: { AppNo: 1 } },
      { upsert: true, returnDocument: "after" } // Ensure document exists and return updated version
    );
    console.log(counter);

    // Extract the new Application Number
    const AppNo = counter.AppNo || 1; // Fallback to 1 if it doesn’t exist

    // Format the submission date
    req.body.verify = false;
    req.body.submittedOn = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    req.body.AppNo = AppNo; // Attach Application Number

    // Insert admission record
    const insertResult = await admissionsCollection.insertOne(req.body);

    await disconnect();
    res.json({ status: !!insertResult, AppNo }); // Return status & new AppNo
  } catch (error) {
    console.error("Error in newAdmission:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
});

Router.post("/GetSubjects", async (req, res) => {
  const db = await connect();
  const collection = db.collection("Subjects");
  const subs = await collection.findOne({ course: req.body.course });
  console.log(req.body.course);
  console.log(req.body.year);
  console.log(subs);
  const yearMap = {
    "First Year": () => subs.subjects.firstYear?.semContent,
    "Second Year": () => subs.subjects.secondYear?.semContent,
    "Third Year": () => subs.subjects.thirdYear?.semContent,
    "Fourth Year": () => subs.subjects.fourthYear?.semContent,
    "Fifth Year": () => subs.subjects.fifthYear?.semContent,
  };

  // Call only when needed
  const finalResult = (yearMap[req.body.year] || (() => null))();

  res.json(finalResult);
});
Router.post("/checkSubmit", async (req, res) => {
  console.log("Getting Called");
  const db = await connect();
  const collection = db.collection("Admissions");
  const adm = await collection.findOne({ email: req.body.email });
  console.log(adm);
  if (adm) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});
Router.post("/addExamForm", async (req, res) => {
  console.log("Verify First");
  //write verification of exam form first before pushing

  const name = req.body.name;
  console.log(name);
  console.log(req.body.examForm);

  const db = await connect();
  const collection = db.collection("ExamForms");
  const checkClass = await collection.findOne({
    title: "Undergraduate-BSc-Plain-First Year",
    type: "Regular",
  });
  if (!checkClass) {
    await collection.insertOne({
      title: "Undergraduate-BSc-Plain-First Year",
      type: "Regular",
    });
  }
  const adm = await collection.updateOne(
    { title: "Undergraduate-BSc-Plain-First Year", type: "Regular" },
    { $set: { [name]: req.body.examForm } }
  );
  console.log(adm);
  if (adm.modifiedCount > 0) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});
Router.post("/getStudentExamForms", async (req, res) => {
  const { Regular, Backlogs } = req.body;
  const db = await connect();
  const collection = db.collection("ExamForms");
  const data = await collection.findOne({ title: "selections" });
  if (data) {
    const finalresponse = {
      regular: {date:null, sem:null}, // Initialize regular
      backlog: {}, // Initialize backlog as an empty object
    };
    if (data.regularYears[Regular + "-Sem1"] || data.regularYears[Regular + "-Sem2"]) {
      
      finalresponse.regular.date = data.regularDates[Regular];
      if(data.regularYears[Regular + "-Sem1"]){
        console.log("Sem1 Called")
        finalresponse.regular.sem = "Sem1";
      }else if(data.regularYears[Regular + "-Sem2"]){
        console.log("Sem2 Called")
        finalresponse.regular.sem = "Sem2";
      }
    }

    Backlogs?.forEach((element) => {
      if (data.backlogYears[element]) {
        let temp = element.split("-");
        temp.pop();
        temp = temp.join("-");
        finalresponse.backlog[element] = data.backlogDates[temp];
      } 
    //   else {
    //     finalresponse.backlog[element] = null;
    //   }
    });
    console.log(finalresponse);
    res.json({ status: true, finaldata: finalresponse });
  } else {
    console.log("No Data Found");
    res.json({ status: false, message: "No Data Found" });
  }
});

Router.post("/getAdmission", async (req, res) => {
  const db = await connect();
  const collection = db.collection("Admissions");
  const adm = await collection.findOne({ email: req.body.email });
  if (adm) {
    res.json({ status: true, adm });
  } else {
    res.json({ status: false, message: "No Data Found" });
  }
});

module.exports = Router;
