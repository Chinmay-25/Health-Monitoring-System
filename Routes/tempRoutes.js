const router = require("express").Router();
const bodyParser = require("body-parser");
const { append } = require("express/lib/response");
const tempSchema = require('../Schema/tempSchema');

router.use(
    bodyParser.urlencoded({
        extended: false
    })
);
  
router.use(bodyParser.json());

router.post('/temp', async(req, res) => {
    var tempmodel = new tempSchema(req.body);
    const tempData = await tempmodel.save();
    res.json(tempData);
});

module.exports = router;