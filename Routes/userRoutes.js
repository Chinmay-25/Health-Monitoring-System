const router = require("express").Router();
const bodyParser = require("body-parser");
const { append } = require("express/lib/response");
const userSchema = require("../Schema/userSchema");
// const userSChema = require('../Schema/userSchema');

router.use(
    bodyParser.urlencoded({
        extended: false
    })
);

router.use(bodyParser.json());

router.post('/', async(req, res) => {
    res.json(req.body);
});

router.post('/addUser', async(req, res) => {
    try {
        var newUser = new userSchema(req.body);
        await newUser.save().then((savedObj) => {
            res.status(200).json(savedObj);
        }).catch((err) => {
            res.status(500).json({message:"error at backend", error: err});
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({error: err, message:"Error at backend"});
    }
});

router.post('/getUser', async(req, res) => {
    try {
        var reqData = req.body;
        var query = {
            username: reqData.username
        }
        await userSchema.findOne(query)
            .then((result) => {
                if(!result){
                    res.status(404).json({message:"Username Not Found"});
                }else{
                    res.status(200).json({data:result});
                }
            }).catch((err) => {
                res.status(500).json({data:err, message:"Error at backend"});
            });
    }catch (err) {
        console.log("Error: " + err);
        res.status(500).json({message: "Error at backend", data: err});
    }
});

router.post('/login', async(req, res) => {
    try {
        var reqData = req.body;
        var query = {
            username: reqData.username,
            password: reqData.password
        }
        console.log("at UserRoutes", query);
        await userSchema.findOne(query)
            .then((result) => {
                console.log(result);
                if(!result){
                    res.status(200).json({message:"Username Not Found"});
                }else{
                    res.status(200).json({message:"success", data:result});
                }
            }).catch((err) => {
                res.status(500).json({data:err, message:"Error at backend"});
            });
    }catch (err) {
        console.log("Error: " + err);
        res.status(500).json({message:"Error at backend", data: err});
    }
});

router.post('/updateUser', async(req, res) => {
    try {
        var reqData = req.body;
        await userSchema.findOneAndUpdate({_id:reqData._id}, reqData, { upsert: false, new: true })
            .then((result) => {
                if(result){
                    console.log("Userdata updated successfully");
                }
                res.status(200).json({data: result});
            }).catch((err) => {
                console.log("Error: " + err);
                res.status(500).json({message: "Error at backend", data:err});
            });
    }catch (err) {
        console.log("Error: " + err);
        res.status(500).json({message:"Error at backend", data: err});
    }
});

module.exports = router;