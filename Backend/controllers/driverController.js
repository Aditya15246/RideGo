// THIS IS FOR DRIVER (rider)
const userModel = require("../models/users.model");
const driverModel = require("../models/drivers.model.js");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/config.js');
const bcrypt = require('bcrypt')


async function createDriverProfile(req,res){
  try{
    const userId = req.user.id;
    // find a user
    const user = await userModel.findById(userId)
    if (!user){
      return res.status(400).json({
        "msg": "User not found"
      })
    }
    if (user.role !== "driver"){
      return res.status(400).json({
        "msg": "Only driver creates driver profile"
      })
    }
    const existUser = await userModel.findById({userId})
    if (existUser){
      return res.status(400).json({
        "msg": "Driver profile already exists"
      })
    }

    const {licenseNumber,vehicleType,vehicleModel,vehicleNumber} = req.body
    if (!licenseNumber || !vehicleType || !vehicleModel || !vehicleNumber){
      return res.status(400).json({
        "msg": "All driver details required",

      })
    }
    const driver = await driverModel.create({
      userId,
      licenseNumber,
      vehicleNumber,
      vehicleType,
      vehicleModel,
      isVerified: false,
      isAvailable: false
    });

    // send response 
    return res.status(200).json({
      "msg": "Driver profile created, driver verification pending",
      driver
    })
  }catch(error){
    return res.status(500).json({
      error: error.message,
      "msg": "Server Error"
    })
  }
}

async function getDriverProfile(req,res){

}

async function updateDriverProfile(req,res){

}

async function updateAvailability(req,res){

}

async function updateDriverLocation(req,res){

}

async function getNearbyDrivers(req,res){

}

module.exports = {createDriverProfile}