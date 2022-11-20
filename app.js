const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const tempRoutes = require('./Routes/tempRoutes');
const userRoutes = require('./Routes/userRoutes');
const patientRoutes = require('./Routes/patientRoutes');
const readingRoutes = require('./Routes/readingRoutes');

const app = express();

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
  
  // Cors access and Allow access from all resources on server
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.use("/Routes", express.static("Routes"));
///;


//Using mongoose Lib
mongoose.connect("mongodb+srv://Chinmay:Chinmay2532000@projectcluster.grh0q.mongodb.net/Project_data")
     .then((response) => { console.log("Successfully Connected:"+response) })
    .catch((err) => {console.log("Error:",err)});

app.use(
    bodyParser.urlencoded({
      extended: true
    })
);


app.use(express.json());

app.use('/test', tempRoutes);
app.use('/user', userRoutes);
app.use('/patient', patientRoutes);
app.use('/reading', readingRoutes);

// create home route
app.get("/", (req, res) => {
  console.log(req.body);
  res.json({ "hello": "namaste" })
});

app.post("/test", (req, res) => {
// console.log(req.body);
  res.json(req.body)
});


const port = process.env.PORT || 3002;
app.listen(port, '0.0.0.0', () => {

console.log("app now listening for requests on port ", port);

});
