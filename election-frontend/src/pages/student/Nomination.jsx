import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Nomination = () => {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    position: "",
    department: "",
    classYear: "",
    attendancePercentage: "",
    cgpa: "",
    disciplinaryClearance: false,
    manifesto: null,
    profilePicture: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    const token = localStorage.getItem("token");
    console.log("User Token:", token);

    const res = await fetch("http://localhost:5000/api/nomination/submit", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Include token for authentication
      },
      body: formDataObj,
    });

    const data = await res.json();
    setMessage(data.message || "Nomination submitted!");
  };

  return (
    <div>
      <h2>Nominate Yourself</h2>
      <form onSubmit={handleSubmit}>
        <select name="position" onChange={handleChange} required>
          <option value="">Select Position</option>
          <option value="President">President</option>
          <option value="Vice President">Vice President</option>
          <option value="Secretary">Secretary</option>
          <option value="Treasurer">Treasurer</option>
        </select>

        <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
        <input type="text" name="classYear" placeholder="Class Year" onChange={handleChange} required />
        <input type="number" name="attendancePercentage" placeholder="Attendance %" onChange={handleChange} required />
        <input type="number" name="cgpa" placeholder="CGPA" onChange={handleChange} required />

        {/* Boolean Checkbox for Disciplinary Clearance ✅ */}
        <label>
          <input type="checkbox" name="disciplinaryClearance" onChange={handleChange} /> Disciplinary Clearance
        </label>

        {/* File Inputs for Manifesto & Profile Picture ✅ */}
        <input type="file" name="manifesto" onChange={handleFileChange} required />
        <input type="file" name="profilePicture" onChange={handleFileChange} required />

        <button type="submit">Submit Nomination</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Nomination;
