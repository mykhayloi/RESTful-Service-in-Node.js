/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var router = express.Router();

const dataLayer = require("../companydata");
const Timecard = dataLayer.Timecard;

router.get('/', function (req, res, next) {
    let timecard = dataLayer.getTimecard(req.query.timecard_id);
    res.json(timecard);
});

router.post('/', function (req, res, next) {
    
    let emp_id = req.body.emp_id;
    let start = req.body.start_time;
    let end = req.body.end_time; 
    
    let startTime = new Date(start);
    let endTime = new Date(end);
    
    
    let test_emp = dataLayer.getEmployee(emp_id);

    validateTimecard(test_emp, res, startTime, endTime, emp_id);
    
    let timecard = new Timecard(start,end,req.body.emp_id);
    let result = dataLayer.insertTimecard(timecard);
    res.json(result);
    
    
    
});



router.put('/', function (req, res, next) {
    
    let emp_id = req.body.emp_id;
    let start = req.body.start_time;
    let end = req.body.end_time;
    let timecard_id = req.body.timecard_id;
    
    
    let startTime = new Date(start);
    let endTime = new Date(end);
    
    
    let test_emp = dataLayer.getEmployee(emp_id);
    
    validateTimecard(test_emp, res, startTime, endTime, emp_id);

    
    if(!(dataLayer.getTimecard(timecard_id))){
        res.json("{\"error\":\"Please use a valid timecard with a valid id.\"}");
    }
    
    let timecard = new Timecard(start, end,timecard_id);
    timecard.setId(req.body.timecard_id);
    let result = dataLayer.updateTimecard(timecard);
    res.json(result);
    
});

router.delete('/', function (req, res, next){
   let timecard = dataLayer.getTimecard(req.query.timecard_id);
   let result = dataLayer.deleteDepartment(timecard);
   res.json(result);
});

function validateTimecard(test_emp, res, startTime, endTime,emp_id){
    if(!(test_emp)){
        res.json("{\"error\":\"Please use an existing emp_id\"}");
    }

    if(startTime.getTime() === startTime.getTime() && endTime.getTime() === endTime.getTime()){
        if(startTime > (Date.now() - 604800000)){
            res.json("{\"error\":\"Please use a valid date(up to 1 week ago).\"}");
        }
        if(endTime < (startTime - 3600000)){
            res.json("{\"error\":\"Please use a valid end date(has to be at least an hour affter start time).\"}");
        }
        if(endTime.getUTCDate() !== startTime.getUTCDate() || endTime.getUTCMonth() !== startTime.getUTCMonth()){
            res.json("{\"error\":\"Please use a valid end date(has to be same day as start time).\"}");
        }
        
        if(startTime.getDay() === 0 || startTime.getDay() === 6 || endTime.getDay() === 0 || endTime.getDay() === 6){
            res.json("{\"error\":\"Please enter a valid date (Saturday/Sunday can not be used.)\"}");
        }
        
        if(startTime.getHours() > 18 || startTime.getHours() < 6 || endTime.getHours() > 18 || endTime.getHours() < 6){
            res.json("{\"error\":\"Please enter a valid time (Between 6 and 18 o'clock.)\"}");
        }
    }else{
        res.json("{\"error\":\"Please use a valid date format.\"}");
    }
    
    let emp_timecards  = dataLayer.getAllTimecard(emp_id);
    
    for(var i = 0; i < emp_timecards.length; i++){
        let test_start = emp_timecards[i];
        let test_start_time = new Date(test_start.start_time);
        
        if(startTime.getUTCDate() === test_start_time.getUTCDate()){
            res.json("{\"error\":\"Please use a different start date (there can't be two on the same day).\"}");
        }
        
    }
}


module.exports = router;
