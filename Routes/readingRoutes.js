const router = require('express').Router();
const bodyParser = require("body-parser");
const req = require('express/lib/request');
const { append } = require("express/lib/response");
const readingSchema = require('../Schema/readingSchema');
const patientSchema = require('../Schema/patientSchema');
const { query } = require('express');

// co/nst fs = require('fs')
// const helper = 


router.use(
    bodyParser.urlencoded({
        extended: false
    })
);

router.use(bodyParser.json());

router.post('/', async(req, res) => {
    res.json(req.body);
});

router.post('/addReadings', async(req, res) => {
    try {
        let reqData = req.body;
        const newData = new readingSchema(reqData);
        await newData.save()
            .then((savedObj) => {
                if(!savedObj){
                    res.status(500).json({message:"Server Error"});
                }else{
                    res.status(200).json({data:savedObj});
                }
            }).catch((err) => {
                console.log("Error: " + err.message);
            });
    } catch (err) {
        console.log("Error" + err);
        res.status(400).json({message:"Unexprected Error", data: err.message});
    }
});

router.post('/getReadings', async(req, res) => {
    try{
        let reqData = req.body;
        console.log(reqData);
        readingSchema.find(reqData)
            .then(async (result) => {
                console.log("Readings: ", result);
                if(result.length == 0){
                    res.status(200).json({message:"No Data Found"});
                }else{
                    console.log("a", result[0]);
                    console.log("b", result[0].patientNumber);
                    let query = {"patientNumber":result[0].patientNumber};
                    console.log(query);
                    await patientSchema.find(query)
                        .then((dbData) => {
                            console.log(dbData);
                            if(dbData == []){
                                result[0]["patientName"] = "N/A";
                                res.status(200).json({message:"success", data:result});
                            }else{
                                console.log("aa", dbData);
                                console.log("bb", dbData[0]);
                                console.log("cc", dbData[0].name);
                                // result[0]["patientName"] = dbData[0].name;
                                var resMsg = { ...result[0].toObject(), ...{ 'patientName': dbData[0].name, 'indication':dbData[0].indication, "conclusion":dbData[0].conclusion } }
                                console.log("dd", resMsg);
                                res.status(200).json({message:"success", data:resMsg});
                            }
                        }).catch((err) => {
                            res.status(400).json({message:err.message});
                        });
                }
            }).catch((err) => {
                console.log("Error: " + err.message);
                res.status(400).json({message:"1Backend Error", data:err.message});
            });
    }catch(err) {
        res.status(500).json({message:"Unexprected Error", data:err.message});
    }
});


module.exports = router;