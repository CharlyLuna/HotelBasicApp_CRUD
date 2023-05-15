const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
      validate: {
        validator: (req) => {
          return true; // True just for testing
        },
        message: "Room number is not valid",
      },
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // this will automatically add the createdAt and the updatedAt field for us
    versionKey: false, // to disable the __v field
  }
);

module.exports = mongoose.model("guests", guestSchema);
