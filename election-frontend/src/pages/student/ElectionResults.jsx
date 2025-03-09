import { useEffect, useState } from "react";
import axios from "axios";

const ElectionResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/results");
        setResults(res.data);
      } catch (error) {
        console.error("Error fetching election results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>Election Results</h2>
      {results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <ul>
          {results.map((candidate) => (
            <li key={candidate._id}>
              {candidate.candidate.name} - {candidate.position}: {candidate.votes} votes
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ElectionResults;
