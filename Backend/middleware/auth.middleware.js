const express = require('express')
const config = require('../config/config')
const jwt = require('jsonwebtoken')

function AuthMiddle(req,res,next){
  try{
    const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(404).json({
      msg: "Authentication required"
    })
  }
  const token = authHeader.split(" ")[1]
  const decoded = jwt.verify(token, config.JWT_SECRET);
  req.user = decoded

  next()
  }catch(error){
    return res.status(404).json({
      msg: "Expired or invalid token"
    })
  }
  
}

module.exports = AuthMiddle;