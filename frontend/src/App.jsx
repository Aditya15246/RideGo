
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PassengerDashboard from "./pages/PassengerDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import RideTracking from "./pages/RideTracking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/passenger/dashboard"
          element={<PassengerDashboard />}
        />

        <Route
          path="/driver/dashboard"
          element={<DriverDashboard />}
        />

        <Route
          path="/ride/:rideId"
          element={<RideTracking />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
