const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
// const socket = require('./sockets/ride.sockets.js')
// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true
  }
});

const connectDB = require('./config/database.js');
const authRouter = require('./routes/auth.Routes.js');
const rideSockets = require('./sockets/ride.sockets.js');
// Express middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'RideGo API is running'
  });
});



// Register Socket.IO event handlers
rideSockets(io);

// Connect DB first, then start server
async function startServer() {
  try {
    await connectDB();

    server.listen(2000, () => {
      console.log('RideGo server running on port 2000');
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
