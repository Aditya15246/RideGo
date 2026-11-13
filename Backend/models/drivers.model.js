const mongoose = require('mongoose')
const express = require('express')

const driverSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ["Bike","Scooter","Car"]
  },
  vehicleNumber: {
    type: Number,
    required:true,
    unique: true,
    trim: true,
    uppercase: true
  },
  vehicleModel:{
    type: String,
    required: true,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },

  availabilityStatus: {
    type: String,
    enum: ["offline", "available", "on_ride"],
    default: "offline"
  },

  currentLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      default: undefined
    }
  },

  lastLocationUpdateAt: {
    type: Date,
    default: null
  },
  
  rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
  }
}, {timestamps: true}
)

driverSchema.index({ currentLocation: "2dsphere" });
module.exports = mongoose.model("Driver", driverSchema);