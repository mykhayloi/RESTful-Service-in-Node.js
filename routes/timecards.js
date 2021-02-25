
var express = require('express');
var router = express.Router();

const dataLayer = require("../companydata");

/* GET users listing. */
router.get('/', function (req, res, next) {
    let timecards = dataLayer.getAllTimecard(req.query.emp_id);
    res.json(timecards);
});

module.exports = router;
