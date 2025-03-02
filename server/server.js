//import statements
const express = require("express");
const app = express();
const cors = require('cors');
const teacher = require("./teacherRoutes.js");
const cap = require("./capRoutes.js");
const student = require("./studentRoutes.js");
const pages = require("./pagesRoute.js");
const test = require("./TestRoutes.js");

require("dotenv").config();
const { connect, disconnect } = require("./mongoConn.js");
app.use(cors());
//middlewares
app.use("/teacher", teacher);
app.use("/cap", cap);
app.use("/student", student);
app.use("/pages", pages);
app.use("/test", test);

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static("public"));

//routes
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/signup", async (req, res) => {
  if (req.body.role === "student") {
    const db = await connect();
    const collection = db.collection("StudentAccounts");
    const checkemail = await collection.findOne({ email: req.body.email });
    const checknumber = await collection.findOne({
      mobileNumber: req.body.mobileNumber,
    });

    if (checkemail) {
      return res.json({
        success: false,
        message: "Email Already Exists",
      });
    }
    if (checknumber) {
      return res.json({
        success: false,
        message: "Mobile Number Already Exists",
      });
    }
    const insertResult = await collection.insertOne(req.body);
    await disconnect();
    res.json({
      success: true,
      role:req.body.role,
      message: "Account Created Successfully. Login using your credentials",
    });
  } else if (req.body.role === "teacher") {
    req.body.verify = false;
    const db = await connect();
    const collection = db.collection("TeacherAccounts");
    const checkemail = await collection.findOne({ email: req.body.email });
    const checknumber = await collection.findOne({
      mobileNumber: req.body.mobileNumber,
    });
    if (checkemail) {
      return res.json({
        success: false,
        message: "Email Already Exists",
      });
    }
    if (checknumber) {
      return res.json({
        success: false,
        message: "Mobile Number Already Exists",
      });
    }
    const insertResult = await collection.insertOne(req.body);
    await disconnect();
    res.json({
      success: true,
      message: "Account Creation Request Sent wait for verification",
    });
  } else if (req.body.role === "cap") {
    req.body.verify = false;
    const db = await connect();
    const collection = db.collection("CapAccounts");
    const checkemail = await collection.findOne({ email: req.body.email });
    const checknumber = await collection.findOne({
      mobileNumber: req.body.mobileNumber,
    });
    if (checkemail) {
      return res.json({
        success: false,
        message: "Email Already Exists",
      });
    }
    if (checknumber) {
      return res.json({
        success: false,
        message: "Mobile Number Already Exists",
      });
    }
    const insertResult = await collection.insertOne(req.body);
    await disconnect();
    res.json({
      success: true,
      message: "Account Creation Request Sent wait for verification",
    });
  } else {
    res.json({
      success: false,
      message: "Some Error Occured Try Again Later",
    });
  }
});

app.post("/signin", async (req, res) => {
  console.log(req.body);

  let checkemail = false;
  const db = await connect();
  if (req.body.role == "student") {
    const collection = db.collection("StudentAccounts");
    checkemail = await collection.findOne({
      mobileNumber: req.body.mobileNumber,
      password: req.body.password
    });
    console.log("searching in students");
  } else if (req.body.role == "teacher") {
    const collection = db.collection("TeacherAccounts");
    checkemail = await collection.findOne({
      mobileNumber: req.body.mobileNumber,
      password: req.body.password,
    });
  } else if (req.body.role == "cap") {
    const collection = db.collection("CapAccounts");
    checkemail = await collection.findOne({
      mobileNumber: req.body.mobileNumber,
      password: req.body.password,
    });
  } else {
    disconnect();
    return res.json({
      success: false,
      message: "Some Error Occured Try Again Later",
    });
  }
  console.log(checkemail);
  if (checkemail) {
    // const sessionToken = req.body.mobilenumber;

    // Set the token as a cookie
    // res.cookie("session_token", sessionToken, {
    //   httpOnly: true, // Prevents JavaScript access to the cookie
    //   secure: true, // Use only in HTTPS environments
    //   maxAge: 2 * 60 * 1000, // 1 day expiration
    // });
    if (req.body.role == "teacher" || req.body.role == "cap") {
      if (!checkemail.verify) {
        return res.json({
          success: false,
          message: "Account Not Verified Yet Please Contact Your Administrator",
        });
      }
    }
    console.log(checkemail);
    res.json({
      message: "Login successful",
      mobileNumber: req.body.mobileNumber,
      role: req.body.role,
      name: checkemail.firstName + " " + checkemail.lastName,
      success: true,
    });
  } else {
    return res.json({ message: "Invalid credentials", success: false });
  }
});

// app.get("/check-session", (req, res) => {
//   const sessionToken = req.cookies.session_token;

//   // Replace this with your session verification logic
//   if (sessionToken === req.body.mobilenumber) {
//     res.json({ loggedIn: true, id: req.body.mobilenumber });
//   } else {
//     res.json({ loggedIn: false ,id:null});
//   }
// });

app.get("/counter", async (req, res) => {
  console.log("counter called")
  const db = await connect();
  const collection = db.collection("Counter");
  const counter = await collection.findOneAndUpdate(
    {label: "counter"},
    { $inc: { AppNo: 1 } },
    { returnOriginal: false }
  );
  console.log(counter);
  await disconnect();
  res.json(counter);
});

app.post("/logout", (req, res) => {
  res.clearCookie("session_token");
  res.json({ message: "Logged out" });
});

//server
app.listen(5000, () => {
  console.log("Server listening on Port 5000");
});
