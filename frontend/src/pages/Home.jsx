
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>RideGo</h1>

      <p>Your ride, your journey.</p>

      <button onClick={() => navigate("/login")}>
        Login
      </button>

      <button onClick={() => navigate("/register")}>
        Get Started
      </button>
    </div>
  );
}

export default Home;
