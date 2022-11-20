const router = require("express").Router();
const bodyParser = require("body-parser");
const { append } = require("express/lib/response");
const patientSchema = require("../Schema/patientSchema");

router.use(
    bodyParser.urlencoded({
        extended: false
    })
);

router.use(bodyParser.json());

router.post('/', async(req, res) => {
    res.json(req.body);
});

router.post('/addPatient', async(req, res) => {
    try {
        reqData = req.body;
        var newPatient = new patientSchema(reqData);
        await newPatient.save()
            .then((savedObj) => {
                res.status(200).json({data:savedObj});
            }).catch((err) => {
                console.log("Error: " + err);
                res.status(403).json({message: "Error at backend", data: err});
            });
    }catch (err) {
        console.log("Error: " + err);
        res.status(500).json({message:"Unexpected Error", data: err});
    }
});

router.post('/getPatient', async(req, res) => {
    try {
        let reqData = req.body;
        if(!reqData.patientNumber){
            res.status(400).json({"message":"Bad Input"});
        }else{
            await patientSchema.findOne({patientNumber:reqData.patientNumber})
                .then((result) => {
                    if(!result){
                        res.status(404).json({message:"Data not found"});
                    }
                    else{
                        res.status(200).json({data:result});
                    }
                }).catch((err) => {
                    console.log("Error: " + err);
                    res.status(500).json({message:"Error at backend", data: err});
                });
        }
    }catch (err) {
        console.log("Error: " + err);
        res.status(500).json({message:"Unexpected Error", data: err});
    }
});

router.post('/getPatientsByDocId', async(req, res) => {
    try{
        let reqData = req.body;
        await patientSchema.find({doctorId: reqData.doctorId})
            .then((result) => {
                if(!result){
                    res.status(404).json({message:"No data found"});
                }else{
                    res.status(200).json({data:result});
                }
            }).catch((err) => {
                console.log("Error: " + err);
                res.status(500).json({message:"Backend Error", data:err});
            });
    }catch(err) {
        console.log("Error: " + err);
        res.status(500).json({message:"Backend Error", data:err.message});
    };
});

module.exports = router;