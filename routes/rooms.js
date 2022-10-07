
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

let Room = require('../models/room');

router.get('/rooms', function(req, res, next){
  Room.find(function (err, rooms) {
    if (err) return next(err);
    res.render('roomIndex',{rooms});

  });
});

router.get('/deleteRoom/:id', function(req, res, next){
  Room.findByIdAndRemove(req.params.id, req.body, function (err, post){
    if (err) return next(err);
    res.redirect('/rooms');
  });
});

router.get('/findByIdR/:id', function(req, res, next){
  Room.findById(req.params.id, function (err, room) {
    if (err) return next(err);
    res.render('roomUpdate', {room});
  });
});


router.post('/updateRoom', function(req, res, next){
 Room.findByIdAndUpdate(req.body.objId, {
    idR: req.body.idR,
    roomNumber: req.body.roomNumber,
    roomType: req.body.roomType,
    roomPrice: req.body.roomPrice,
    roomStatus: req.body.roomStatus,
    }, function(err, post){
      if (err) return next(err);
      res.redirect('/rooms');
    });
  });

router.get('/main', function (req, res){
  res.render('main');
});

router.get('/room', function (req, res){
  res.render('room');
});


router.post('/addRoom', function(req, res){
  
  const myRoom = new Room({
    idR: req.body.idR,
    roomNumber: req.body.roomNumber,
    roomType: req.body.roomType,
    roomPrice: req.body.roomPrice,
    roomStatus: req.body.roomStatus,
    }); 
    myRoom.save();
    res.redirect('/rooms');
    
});

module.exports=router;