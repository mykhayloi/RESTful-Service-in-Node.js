/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var router = express.Router();

const dataLayer = require("../companydata");
const Employee = dataLayer.Employee;
const Department = dataLayer.Department;

/* GET users listing. */
router.get('/', function (req, res, next) {
    let employee = dataLayer.getEmployee(req.query.emp_id);
    if(!(employee))
    {
        res.json("Employee does not exist under this id")
    }
    res.json(employee);
});

router.post('/', function (req, res, next) {
    let emp_name = req.body.emp_name;
    let emp_no = req.body.emp_no;
    let hire_date = req.body.hire_date;
    let job = req.body.job;
    let salary = req.body.salary;
    let dept_id = req.body.dept_id;
    let mng_id = req.body.mng_id;
    let company = req.body.company;
    
    let department = dataLayer.getDepartment(company, dept_id);
    let manager = dataLayer.getEmployee(mng_id);
    let employees = dataLayer.getAllEmployee(company);
    let startDate = new Date(hire_date);  


    validateEmployee(department,res, manager, mng_id, employees, emp_no, startDate);

    let employee = new Employee(emp_name, emp_no, hire_date, job, salary, dept_id, mng_id);
    let result = dataLayer.insertEmployee(employee);
    res.json(result);
});



router.put('/', function (req, res, next) {
    
    let emp_name = req.body.emp_name;
    let emp_no = req.body.emp_no;
    let hire_date = req.body.hire_date;
    let job = req.body.job;
    let salary = req.body.salary;
    let dept_id = req.body.dept_id;
    let mng_id = req.body.mng_id;
    let company = req.body.company;
    let emp_id = req.body.emp_id;
    
    let department = dataLayer.getDepartment(company, dept_id);
    let manager = dataLayer.getEmployee(mng_id);
    let employees = dataLayer.getAllEmployee(company);
    let startDate = new Date(hire_date);
    let test_employee = dataLayer.getEmployee(emp_id);
    
    console.log(company);
    console.log(department);
    
    validateEmployee(department,res, manager, mng_id, employees, emp_no, startDate);

    if(!(test_employee)){
        res.json("{\"error\":\"Please enter a valid emp_id\"}");
    }
    
    let employee = new Employee(req.body.emp_name, req.body.emp_no, req.body.hire_date, req.body.job, req.body.salary, req.body.dept_id,req.body.mng_id );
    employee.setId(emp_id);
    let result = dataLayer.updateEmployee(employee);
    res.json(result);
});

router.delete('/', function (req, res, next){

   let result = dataLayer.deleteEmployee(req.query.emp_id);
   res.json(result);
});


function validateEmployee(department, res, manager, mng_id, employees, emp_no, startDate){
    
     if(!(department)){
        res.json("{\"error\":\"Please use an existing dept_id\"}");    
    }

    if(!(manager) && mng_id != 0){

        res.json("{\"error\":\"Please use an existing mng_id\"}");
    }
    
    
    for(var i = 0; i < employees.length; i++){
        let test_emp = employees[i];
        if(emp_no === test_emp.emp_no){
            res.json("{\"error\":\"Please use a unique emp_no\"}");
            break;
        }
    }

    if(startDate.getDay() > 4){
        res.json("{\"error\":\"Please enter a valid date (Saturday/Sunday can not be used.)\"}");
    }
    if(!(Date.parse(startDate) <= Date.now())){
        res.json("{\"error\":\"Please enter a valid date (Must be before today.)\"}");
    }
}

module.exports = router;



