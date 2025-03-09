import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NominationForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    position: "",
    department: "",
    classYear: "",
    attendancePercentage: "",
    cgpa: "",
    disciplinaryClearance: false, // Boolean field ✅
    manifesto: null,
    profilePicture: null,
  });

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
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    const token = localStorage.getItem("token");
    console.log("User Token:", token);

    const response = await fetch("http://localhost:5000/api/nomination/submit", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Send token
      },
      body: formDataToSend,
    });

    if (response.ok) {
      alert("Nomination submitted successfully!");
      navigate("/student-dashboard");
    } else {
      alert("Failed to submit nomination.");
    }
  };

  return (
    <div>
      <h2>Submit Your Nomination</h2>
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
        <input type="number" name="attendancePercentage" placeholder="Attendance Percentage" onChange={handleChange} required />
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
    </div>
  );
};

export default NominationForm;
