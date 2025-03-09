import { useState } from "react";
import axios from "axios";

const DeclareResults = () => {
  const [message, setMessage] = useState("");

  const handleDeclareResults = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/declare-results");
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Error declaring results");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Declare Election Results</h2>
      <button onClick={handleDeclareResults}>Declare Results</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeclareResults;
