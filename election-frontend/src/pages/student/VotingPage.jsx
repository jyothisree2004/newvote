import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VotingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the list of candidates
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/candidates"); // Adjust API URL
        setCandidates(res.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate) {
      setMessage("Please select a candidate before voting.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/vote", // Adjust API URL
        { candidateId: selectedCandidate, voterId: user._id }
      );

      if (res.data.success) {
        setHasVoted(true);
        setMessage("✅ Your vote has been successfully cast!");
      } else {
        setMessage("❌ You have already voted!");
      }
    } catch (error) {
      console.error("Error while voting:", error);
      setMessage("❌ An error occurred while submitting your vote.");
    }
  };

  return (
    <div>
      <h2>🗳️ Vote for Your Candidate</h2>
      {message && <p>{message}</p>}

      {!hasVoted ? (
        <div>
          <ul>
            {candidates.map((candidate) => (
              <li key={candidate._id}>
                <label>
                  <input
                    type="radio"
                    name="candidate"
                    value={candidate._id}
                    onChange={() => setSelectedCandidate(candidate._id)}
                  />
                  {candidate.name} - {candidate.position}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleVote}>Submit Vote</button>
        </div>
      ) : (
        <p>✅ You have already voted!</p>
      )}
    </div>
  );
};

export default VotingPage;
