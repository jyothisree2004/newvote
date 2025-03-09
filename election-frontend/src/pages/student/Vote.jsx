import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Vote = () => {
  const { user } = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      const res = await fetch("http://localhost:5000/api/candidates");
      const data = await res.json();
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  const handleVote = async () => {
    const res = await fetch("http://localhost:5000/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voterId: user?.collegeId, candidateId: selectedCandidate }),
    });

    const data = await res.json();
    alert(data.message || "Vote submitted successfully!");
  };

  return (
    <div>
      <h2>Vote for a Candidate</h2>
      <select onChange={(e) => setSelectedCandidate(e.target.value)}>
        <option value="">Select a Candidate</option>
        {candidates.map((c) => (
          <option key={c._id} value={c._id}>
            {c.fullName} ({c.position})
          </option>
        ))}
      </select>
      <button onClick={handleVote} disabled={!selectedCandidate}>Vote</button>
    </div>
  );
};

export default Vote;
