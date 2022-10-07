const mongoose = require('mongoose');


let roomSchema = new mongoose.Schema({
  idR: {
    type: Number,
    unique: true,
    required: true,
  },
  roomNumber: {
    type: String,
    unique: true,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  roomPrice: {
    type: Number,
    required: true,
  },
  roomStatus: {
    type: Boolean,
    default: true,
    required: true,
  },
});


module.exports = mongoose.model('rooms', roomSchema);