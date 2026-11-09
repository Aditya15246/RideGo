const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/database.js');
const authRouter = require('./routes/auth.Routes.js');
require('dotenv').config();

connectDB();

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());
app.use(express.json());

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'RideGo API is running'
  });
});


app.listen(2000, () => {
  console.log(`Server running on port 2000`);
});