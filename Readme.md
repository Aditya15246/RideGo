# RideGo — Ride Booking Platform

A full-stack ride-booking application inspired by platforms like Uber and Rapido. RideGo aims to connect passengers with nearby drivers through location-based ride matching, real-time tracking, and ride management.


## Overview

RideGo is designed to provide a platform where:
- Passengers can request rides by selecting pickup and destination locations.
- Drivers can create profiles and manage their availability.
- The backend can find nearby available drivers.
- Passengers and drivers can track ride progress.
- Users can manage their ride history and profiles.

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Database |
| Mongoose | Database modeling |
| JWT | Authentication |
| bcrypt | Password hashing |
| Socket.IO | Planned real-time communication |
| Google Maps API | Planned map integration |

## Current Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Authentication middleware
- Role-based authorization for passengers and drivers
- Separate User and Driver data models
- Driver profile creation
- Driver profile retrieval
- Driver verification status
- Driver availability and location fields

## Project Structure

```text
RideGo/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        └── services/
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Aditya15246/RideGo.git
cd RideGo
```

### 2. Backend setup

```bash
cd Backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the Backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Never commit your `.env` file or expose your database credentials.

### 4. Start the backend

```bash
npm run dev
```

### 5. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## Planned Features

- Passenger and driver dashboards
- Ride request and ride lifecycle management
- Nearby driver discovery using MongoDB geospatial queries
- Google Maps integration and route visualization
- Real-time driver location tracking using Socket.IO
- Fare estimation and calculation
- Ride history and ratings
- Payment gateway integration
- Application deployment

## Learning Objectives

Through RideGo, I am working on practical implementation of:

- REST API architecture
- Authentication and authorization
- MongoDB relationships and schema design
- Geospatial queries
- Real-time communication using WebSockets
- Full-stack application development
- Backend security and deployment

## Project Status

RideGo is currently under development. Authentication, role-based access control, and the initial driver profile functionality are being implemented. More features will be added progressively.

## Author

**Aditya**

Built as a hands-on full-stack development project to strengthen backend engineering, database design, and real-time application development skills.