var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var basePath = '/IvchenkoMP3/CompanyServices';

var indexRouter = require('./routes/index');
var departmentRouter = require('./routes/department.js');
var departmentsRouter = require('./routes/departments.js');
var employeeRouter = require('./routes/employee.js');
var employeesRouter = require('./routes/employees.js');
var timecardRouter = require('./routes/timecard.js');
var timecardsRouter = require('./routes/timecards.js');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(basePath + '/department',departmentRouter);
app.use(basePath + '/departments',departmentsRouter);
app.use(basePath+'/employee',employeeRouter);
app.use(basePath+'/employees',employeesRouter);
app.use(basePath+'/timecard',timecardRouter);
app.use(basePath+'/timecards',timecardsRouter);

//app.use('/users', usersRouter);

app.get (basePath, function(req,res){
    res.send('Welcome to Group 11s page');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
