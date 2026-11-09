const express = require('express')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

function RoleMiddle(requiredRole){
  return (req,res,next)=>{
    try{
      if (!req.user){
      return req.status(400).json({
        "msg": "Authentication required"
      })
    }
    if (req.user.role !== requiredRole){
      return res.status(400).json({
        "msg": "Access denied, Permissions required"
      })
    }
    next()
    }catch(error){
      return res.status(500).json({
        "msg": "Server error",
        error: error.message
      })
    }
    
  }
}
module.exports = {RoleMiddle}