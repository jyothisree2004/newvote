import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const NominationStatus = () => {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch(`http://localhost:5000/api/nomination-status/${user?.collegeId}`);
      const data = await res.json();
      setStatus(data.status);
    };
    fetchStatus();
  }, [user]);

  return (
    <div>
      <h2>Nomination Status</h2>
      <p>Your nomination status: <strong>{status || "Loading..."}</strong></p>
    </div>
  );
};

export default NominationStatus;
