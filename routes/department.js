/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();

const dataLayer = require("../companydata");
const Department = dataLayer.Department;

/* GET users listing. */


router.get('/', function (req, res, next) {
    let department = dataLayer.getDepartment(req.query.company, req.query.dept_id);
    res.json(department);
});

router.post('/', function (req, res, next) {
    let company = req.body.company;
    let dept_name = req.body.dept_name;
    let dept_no = req.body.dept_no;
    let location = req.body.location;
    
    
    validateDepartment(company,dept_no, res);
    

    let department = new Department(company, dept_name, dept_no, location);
    let result = dataLayer.insertDepartment(department);
    res.json(result);
});


router.put('/', function (req, res, next) {
    
    let department_test = dataLayer.getDepartment(req.body.company, req.body.dept_id);
    let dept_no = req.body.dept_no;
    
    let departments = dataLayer.getAllDepartment(req.body.company);
    
    if(department_test === null){
            res.json("{\"error\":\"Please use an existing dept_id\"}");
    }
    
    validateDepartment(req.body.company,dept_no, res);
            
    let department = new Department(req.body.company, req.body.dept_name, req.body.dept_no, req.body.location);
    department.setDeptId(req.body.dept_id);
    let result = dataLayer.updateDepartment(department);
    res.json(result);           
    
});


router.delete('/', function (req, res, next){
   let department = dataLayer.getDepartment(req.query.company, req.query.dept_id);
   let result = dataLayer.deleteDepartment(department);
   res.json(result);
});

function validateDepartment(company, dept_no, res){
    
    let departments = dataLayer.getAllDepartment(company);
    
    for(var i = 0; i < departments.length;i++){
        let test_dept = departments[i];
        if(dept_no === test_dept.dept_no){
           res.json("{\"error\":\"Please use a unique dept_no\"}");
            break; 
        }
    }
}

module.exports = router;


