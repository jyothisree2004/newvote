import { Routes, Route } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import { AuthProvider } from "./context/AuthContext";
import StudentDashboard from "./pages/StudentDashboard";
import NominationForm from "./pages/student/NominationForm";
import NominationStatus from "./pages/student/NominationStatus";
import VotingPage from "./pages/student/VotingPage";
import ElectionResults from "./pages/student/ElectionResults";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Import Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import ApproveLogins from "./admin/ApproveLogins";
import ApproveNominations from "./admin/ApproveNominations";
import DeclareElection from "./admin/DeclareElection";
import DeclareResults from "./admin/DeclareResults";

// Admin Route Protection
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user?.role === "admin" ? element : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Student Routes */}
        {/*firstline extra*/}
        <Route path="/" element={<LoginRegister />} />
        {/*<Route path="/" element={<Login />} />*/}
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/nomination" element={<NominationForm />} />
        <Route path="/student/nomination-status" element={<NominationStatus />} />
        <Route path="/student/vote" element={<VotingPage />} />
        <Route path="/student/results" element={<ElectionResults />} />

        {/* Admin Routes (Protected) */}
        <Route path="/admin/dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
        <Route path="/admin/approve-logins" element={<AdminRoute element={<ApproveLogins />} />} />
        <Route path="/admin/approve-nominations" element={<AdminRoute element={<ApproveNominations />} />} />
        <Route path="/admin/declare-election" element={<AdminRoute element={<DeclareElection />} />} />
        <Route path="/admin/declare-results" element={<AdminRoute element={<DeclareResults />} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

