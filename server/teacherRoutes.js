const express = require("express");
const router = express.Router();
const { connect, disconnect } = require("./mongoConn.js");
const bodyparser = require("body-parser");
const { ObjectId } = require("mongodb");
router.use(bodyparser.json())

router.post("/InternalMarkEntry", async(req,res)=>{

    const db = await connect();
    const collection = db.collection("InternalMarks");
    const internalMarkEntry = await collection.insertOne(req.body);

    res.json({
        status:true,
        message:"Internal Marks Entered Successfully",
        data:internalMarkEntry
    });
})


router.get("/InternalMark", async(req,res)=>{
    const db = await connect();

    const collection = db.collection("InternalMarks");
    const internalMark = await collection.find().toArray();

    res.json({
        status:true,
        message:"Internal Marks fetch Successfully",
        data:internalMark
    });
});

// http://localhost:5000/teacher/InternalMark?subName=Mathematics
router.put("/InternalMarkBySubName/:subName", async (req, res) => {
    const db = await connect();
    const collection = db.collection("InternalMarks");
    const internalMarkEntry = await collection.updateOne(
        { subName: req.params.subName },
        { $set: req.body }
    );

    res.json({
        status: true,
        message: "Internal Marks Updated Successfully",
        data: internalMarkEntry
    });
});

// http://localhost:5000/teacher/InternalMark?_id=67bc6f55058f76676fb35b59
router.put("/InternalMarkById/:id", async (req, res) => {
    const db = await connect();
    const collection = db.collection("InternalMarks");
    const internalMarkEntry = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );

    res.json({
        status: true,
        message: "Internal Marks Updated Successfully",
        data: internalMarkEntry
    });
});

// http://localhost:5000/teacher/InternalMark/67bc76565f2949e68d1bca05
// when you want to delete a particular internal mark entry then you should pass the id of that entry
router.delete("/InternalMark/:id", async (req, res) => {
    const db = await connect();
    const collection = db.collection("InternalMarks");
    const internalMarkEntry = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    res.json({
        status: true,
        message: "Internal Marks Deleted Successfully",
        data: internalMarkEntry
    });
});

// External Mark Entry Starts Here

router.post("/ExternalMarkEntry", async(req,res)=>{

    const db = await connect();
    const collection = db.collection("ExternalMarks");
    const externalMarkEntry = await collection.insertOne(req.body);

    res.json({
        status:true,
        message:"External Marks Entered Successfully",
        data:externalMarkEntry
    });
})

router.get("/ExternalMark", async(req,res)=>{
    const db = await connect();

    const collection = db.collection("ExternalMarks");
    const externalMark = await collection.find().toArray();

    res.json({
        status:true,
        message:"External Marks fetch Successfully",
        data:externalMark
    });
});

// http://localhost:5000/teacher/ExternalMark?subName=Mathematics
router.put("/ExternalMarkBySubName/:subName", async (req, res) => {
    const db = await connect();
    const collection = db.collection("ExternalMarks");
    const externalMarkEntry = await collection.updateOne(
        { subName: req.params.subName },
        { $set: req.body }
    );

    res.json({
        status: true,
        message: "External Marks Updated Successfully",
        data: externalMarkEntry
    });
});

// http://localhost:5000/teacher/ExternalMark?_id=67bc6f55058f76676fb35b59
router.put("/ExternalMarkById/:id", async (req, res) => {
    const db = await connect();
    const collection = db.collection("ExternalMarks");
    const externalMarkEntry = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );

    res.json({
        status: true,
        message: "External Marks Updated Successfully",
        data: externalMarkEntry
    });
});

// http://localhost:5000/teacher/ExternalMark/67bc76565f2949e68d1bca05
// when you want to delete a particular external mark entry then you should pass the id of that entry
router.delete("/ExternalMark/:id", async (req, res) => {
    const db = await connect();
    const collection = db.collection("ExternalMarks");
    const externalMarkEntry = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    res.json({
        status: true,
        message: "External Marks Deleted Successfully",
        data: externalMarkEntry
    });
});


module.exports = router

