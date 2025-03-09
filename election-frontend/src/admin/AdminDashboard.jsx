import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <p>Your Role: {user?.role}</p>

      {/* Include Admin Navigation Buttons */}
      <AdminNav />

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
