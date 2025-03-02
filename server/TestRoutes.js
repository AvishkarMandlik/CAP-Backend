const express = require("express");
const bodyparser = require("body-parser");
const { connect, disconnect } = require("./mongoConn.js");
const router = express.Router();


router.use(bodyparser.json());
router.get("/payment", async (req, res) => {
    res.json({
        transId: Math.floor(Math.random() * 1000000000),
        amount: "500",
        status: "Success",
        date: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata" }),
        bankresponse: "Nice",
      })
  });




module.exports = router