const express = require('express')
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be required"],
  },
  email:{
    type: String,
    required: [true, "email must be required"],
    unique: [true, "email must be required"]
  },
  password:{
    type: String,
    required: [true, "password must be required"],
  },
  phone: {
    type: String
  },

  role: {
    type: String,
    enum: ["user", "driver"],
    default: "user"
  }
},
  {
    timestamps: true
  }
)

const userModel = mongoose.model('users',userSchema)
module.exports = userModel;
