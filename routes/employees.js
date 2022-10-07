
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

let Employee = require('../models/employee');

router.get('/employees', function(req, res, next){
  Employee.find(function (err, employees) {
    if (err) return next(err);
    res.render('employeeIndex',{employees});

  });
});


router.get('/deleteEmployee/:id', function(req, res, next){
  Employee.findByIdAndRemove(req.params.id, req.body, function (err, post){
    if (err) return next(err);
    res.redirect('/employees');
  });
});


router.get('/findByIdC/:id', function(req, res, next){
  Employee.findById(req.params.id, function (err, employee) {
    if (err) return next(err);
    res.render('employeeUpdate', {employee});
  });
});


router.post('/updateEmployee', function(req, res, next){
 Employee.findByIdAndUpdate(req.body.objId, {
  idE: req.body.idE,
  name: req.body.name,
  lastName: req.body.lastName,
  age: req.body.age,
  email: req.body.email,
  password: req.body.password,
  role: req.body.role}, function(err, post){
      if (err) return next(err);
      res.redirect('/employees');
    });
  });


router.get('/main', function (req, res){
  res.render('main');
});


router.get('/employee', function (req, res){
  res.render('employee');
});


router.post('/addEmployee', function(req, res){
  
  const myEmployee = new Employee({
    idE: req.body.idE,
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role}); 
    myEmployee.save();
    res.redirect('/employees');
    
});


module.exports=router;