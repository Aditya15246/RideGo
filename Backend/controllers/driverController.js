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
  try{
    const userId = req.user.id;
    const driver = await driverModel.findOne({userId}).populate("userId","name email phone")
    if (!driver){
      return res.status(400).json({
        "msg": "Driver profile not found"
      })
    }
    return res.status(201).json({
      "msg": "Driver profile fetched successfully",
      driver
    })
  }catch(error){
    return res.status(404).json({
      "msg": "Server error"
    })
  }
}

async function updateDriverProfile(req,res){
  try{
    const userId = req.user.id;
    // find a user
  const driver = await driverModel.findOne({ userId });
  if (!driver){
      return res.status(400).json({
        "msg": "driver not found"
      })
  }
  // allow only these fields to be updated
  const {licenseNumber,vehicleType,vehicleModel,vehicleNumber} = req.body;
  if (licenseNumber !== undefined) driver.licenseNumber = licenseNumber;
  if (vehicleNumber !== undefined) driver.vehicleNumber = vehicleNumber;
  if (vehicleType !== undefined) driver.vehicleType = vehicleType;
  if (vehicleModel !== undefined) driver.vehicleModel = vehicleModel;

  await driver.save()
  return res.status(200).json({
    "msg": "Driver profile updated successfully",
    driver
  })
  }catch(error){
    if (error.code === 11000) {
      return res.status(409).json({
        message: "License number or vehicle number already exists"
      });
    }

    return res.status(500).json({
      message: "Server error"
    });
  }
};
  


async function updateAvailability(req,res){
  try{
    const userId = req.user.id
  const {status} = req.body
  const driver = await driverModel.findOne({userId})

  // Validate status
  if (!["offline", "available"].includes(status)) {
    return res.status(400).json({
      msg: "Invalid availability status"
    });
  }
  if (!driver){
    return res.status(400).json({
      "msg": "Driver not found"
    })
  }

  // only verified driver can go online on app
  if(!driver.isVerified){
    return res.status(404).json({
      "msg":"Driver is not verified"
    })
  }

  /// Don't allow going offline during an active ride
  if (driver.availabilityStatus === "on_ride" && status === 'offline'){
    return res.status(409).json({
        msg: "Complete your active ride first"
      });
  }
  // const drivers = driverModel.find({
  //   isVerified: true,
  //   availabilityStatus: "available"
  // })
  driver.availabilityStatus = status
  await driver.save()

  return res.status(200).json({
      msg: "Availability updated",
      status: driver.availabilityStatus
    });


  }catch(error){
    return res.status(500).json({
      "msg": "Server error"
    })
  }
}

async function updateDriverLocation(req,res){
  const userId = req.user.id
  
}

async function getNearbyDrivers(req,res){

}

module.exports = {createDriverProfile,getDriverProfile,updateDriverProfile}