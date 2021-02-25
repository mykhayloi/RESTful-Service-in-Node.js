/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();

const dataLayer = require("../companydata");

/* GET users listing. */
//http://localhost:3000/MarasovicKP3/CompanyServices/departments?company=kxmzgr
router.get('/', function (req, res, next) {
    let employees = dataLayer.getAllEmployee(req.query.company);
    if(employees.length === 0)
    {
        res.json("There is no company under this name")
    }
    res.json(employees);
});

module.exports = router;


