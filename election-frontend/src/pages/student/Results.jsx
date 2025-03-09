import { useState, useEffect } from "react";

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch("http://localhost:5000/api/results");
      const data = await res.json();
      setResults(data);
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h2>Election Results</h2>
      <ul>
        {results.map((r) => (
          <li key={r._id}>{r.position}: {r.winnerName} (Votes: {r.votes})</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
