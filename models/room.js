const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true, // this will automatically add the createdAt and the updatedAt field for us
    versionKey: false, // to disable the __v field
  }
);

module.exports = mongoose.model("rooms", roomSchema);
