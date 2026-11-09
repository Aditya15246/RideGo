/// THIS FOR USER (CUSTOMER)
const userModel = require("../models/users.model");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/config.js');
const bcrypt = require('bcrypt')

async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    config.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

async function register(req, res) {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password || !phone || !role) {
      return res.status(400).json({
        message: 'All fields are required'
    })
    }

    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ email }, { phone }]
    });

    if (isAlreadyRegistered) {
      return res.status(409).json({
        message: 'Email or Phone already exists'
      });
    }
    
    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPassValid = await bcrypt.compare(
      password,
      user.password
    )
    if (!isPassValid){
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message
    });
  }
}

async function getMe(req, res) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
      error: error.message
    });
  }
}

module.exports = {
  register,
  login,
  getMe
};