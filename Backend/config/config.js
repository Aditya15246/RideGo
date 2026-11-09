const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ridego',
  JWT_SECRET: process.env.JWT_SECRET || 'ridego-secret-key'
};

