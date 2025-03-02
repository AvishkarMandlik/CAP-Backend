const express = require("express")
const axios = require("axios");
const { connect, disconnect } = require("./mongoConn.js");
const Router = express.Router();
const bodyParser = require('body-parser');
Router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
Router.use(bodyParser.json({ limit: '50mb' }));
Router.post("/checkAdmission", async(req,res)=>{

    const db = await connect();
    const collection = db.collection("Admissions");

    const admission = await collection.findOne({email : req.body.email});
    await disconnect();
    if(admission){
        if(admission.verify){
            res.json({status:true,verify:true});
        }
        else{
             res.json({status:true, verify:false})
        }
    }
    else{
        res.json({status:false});
    }

})

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


Router.post("/GetSubjects", async(req,res)=>{

    const db = await connect();
    const collection = db.collection("Subjects");
    const subs = await collection.findOne({course:req.body.course});
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
})
Router.post("/checkSubmit", async(req,res)=>{
    console.log("Getting Called")
    const db = await connect();
    const collection = db.collection("Admissions");
    const adm = await collection.findOne({email:req.body.email});
    console.log(adm);
    if(adm){
        res.json({status:true});
    }else{
        res.json({status:false});
    }

})

module.exports = Router
