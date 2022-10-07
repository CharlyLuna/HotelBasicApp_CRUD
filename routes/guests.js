
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

let Guest = require('../models/guest');

router.get('/guests', function(req, res, next){
  Guest.find(function (err, guests) {
    if (err) return next(err);
    res.render('guestIndex',{guests});

  });
});

router.get('/deleteGuest/:id', function(req, res, next){
  Guest.findByIdAndRemove(req.params.id, req.body, function (err, post){
    if (err) return next(err);
    res.redirect('/guests');
  });
});

router.get('/findById/:id', function(req, res, next){
  Guest.findById(req.params.id, function (err, guest) {
    if (err) return next(err);
    res.render('guestUpdate', {guest});
  });
});


router.post('/updateGuest', function(req, res, next){
 Guest.findByIdAndUpdate(req.body.objId, {
    idG: req.body.idG,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    roomNumber: req.body.roomNumber,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    numberOfGuests: req.body.numberOfGuests,
    paymentMethod: req.body.paymentMethod,
    }, function(err, post){
      if (err) return next(err);
      res.redirect('/guests');
    });
  });



router.get('/main', function (req, res){
  res.render('main');
});

router.get('/guest', function (req, res){
  res.render('guest');
});

router.post('/addGuest', function(req, res){
  
  const myGuest = new Guest({
    
    idG: req.body.idG,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    roomNumber: req.body.roomNumber,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    numberOfGuests: req.body.numberOfGuests,
    paymentMethod: req.body.paymentMethod,
    }); 
    myGuest.save();
    res.redirect('/guests');
    
});


module.exports=router;