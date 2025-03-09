import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Your Role: {user.role}</p>

      <button onClick={() => navigate("/student/nomination")}>Nominate Yourself</button>
      <button onClick={() => navigate("/student/nomination-status")}>View Nomination Status</button>
      <button onClick={() => navigate("/student/vote")}>Vote Now</button>
      <button onClick={() => navigate("/student/results")}>View Results</button>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;
