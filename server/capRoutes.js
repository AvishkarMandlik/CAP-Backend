const express = require("express");
const bodyparser = require("body-parser");
const { connect, disconnect } = require("./mongoConn.js");
const router = express.Router();


router.use(bodyparser.json());
router.get("/Teacherverification", async (req, res) => {
    const db = await connect();
    const collection = db.collection("TeacherAccounts");
    const verificationAccounts = await collection.find({verify:false}).toArray();
    console.log("found documents =>", verificationAccounts);
    await disconnect();
    res.send(verificationAccounts);
  });

router.get("/Admissionverification", async (req, res) => {
    const db = await connect();
    const collection = db.collection("Admissions");
    const verificationAccounts = await collection.find({verify:false}).toArray();
    console.log("found documents =>", verificationAccounts);
    await disconnect();
    res.send(verificationAccounts);
  });


router.put("/verifyTeacher", async (req,res) => {
  const db = await connect();
  const collection = db.collection("TeacherAccounts");
  const updateResult = await collection.updateOne({email:req.body.email},{$set:{verify:true}});
  res.send(updateResult)
})

router.put("/verifyAdmission", async (req,res) => {
  const db = await connect();
  const collection = db.collection("Admissions");
  const updateResult = await collection.updateOne({email:req.body.email},{$set:{verify:true}});
  res.send(updateResult)
})

router.post("/AddCourse", async (req, res) => {
  console.log(req.body);
  const db = await connect();
  const collection = db.collection("Courses");

  const FindLevel = await collection.findOne({});

  if (FindLevel && FindLevel[req.body.course[0]]) {
    if (FindLevel[req.body.course[0]][req.body.course[1]]) {
      if (FindLevel[req.body.course[0]][req.body.course[1]][req.body.course[2]]) {
        // ✅ Stream already exists → Just update years
        const updateResult = await collection.updateOne(
          { [`${req.body.course[0]}.${req.body.course[1]}.${req.body.course[2]}`]: { $exists: true } },
          { $set: { [`${req.body.course[0]}.${req.body.course[1]}.${req.body.course[2]}`]: req.body.years } }
        );
        return res.json({ message: "Updated existing course structure", updateResult });
      } else {
        // ✅ Course & Level exist, but stream does not → Add the new stream without overwriting other streams
        const updateResult = await collection.updateOne(
          { [`${req.body.course[0]}.${req.body.course[1]}`]: { $exists: true } },
          { 
            $set: { 
              [`${req.body.course[0]}.${req.body.course[1]}.${req.body.course[2]}`]: req.body.years 
            }
          }
        );
        return res.json({ message: "Added new stream", updateResult });
      }
    } else {
      // ✅ Level exists, but course does not → Add new course without overwriting other courses
      const updateResult = await collection.updateOne(
        { [req.body.course[0]]: { $exists: true } },
        {
          $set: { 
            [`${req.body.course[0]}.${req.body.course[1]}`]: { [req.body.course[2]]: req.body.years } 
          }
        }
      );
      return res.json({ message: "Added new course", updateResult });
    }
  } else {
    // ✅ Education Level does not exist → Add it as a new key in the same document
    const updateResult = await collection.updateOne(
      {},
      {
        $set: {
          [`${req.body.course[0]}`]: {
            [req.body.course[1]]: {
              [req.body.course[2]]: req.body.years
            }
          }
        }
      },
      { upsert: true } // ✅ Ensures that if no document exists, it creates one
    );
    return res.json({ message: "Added new education level", updateResult });
  }
});



router.post("/AddSubjects", async (req,res) => {
  console.log(req.body);
  const db = await connect();
  const collection = db.collection("Subjects");
  const updateResult = await collection.insertOne({course:req.body.course,years:req.body.years,subjects:req.body.subjects});
  res.send(updateResult)
})

router.get("/GetCourses", async (req,res) => {
  const db = await connect();
  const collection = db.collection("Courses");
  const getCourses = await collection.findOne({});
  res.json(getCourses);
});

// this is teacherDashboard entry for Marks and Courses Ans subject selection
router.post("/addEntriesforteacher", async (req, res) => {
      const db = await connect();
      const collection = db.collection("TeacherallocatesSubjectEntries");

      const { punCode, appointmentID, pattern, subject, endDate, batchNo } = req.body;
      const updateResult = await collection.insertOne({
          punCode,
          appointmentID,
          pattern,
          subject,
          endDate,
          batchNo
      });
      res.send(updateResult);
});



module.exports = router