import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/admin/approve-logins")}>
        Approve/Reject Logins
      </button>
      <button onClick={() => navigate("/admin/approve-nominations")}>
        Approve/Reject Nominations
      </button>
      <button onClick={() => navigate("/admin/declare-election")}>
        Declare Elections
      </button>
      <button onClick={() => navigate("/admin/declare-results")}>
        Declare Results
      </button>
    </div>
  );
};

export default AdminNav;
