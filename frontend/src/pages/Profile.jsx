import { useState } from "react";
import "../styles/profile.css";

function Profile() {
  const [student, setStudent] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    studentId: "STU12345",
    program: "Bachelor of ICT",
    year: "3rd Year"
  });

  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState("/profile.png");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    alert("Profile updated successfully!");
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  return (
    <div className="profile-container">
      <h2>Student Profile</h2>

      <div className="profile-card">
        <div className="profile-left">
          <img src={profilePic} alt="Profile" className="avatar" />
          <input type="file" accept="image/*" onChange={handleUpload} />
        </div>

        <div className="profile-right">
          {!editing ? (
            <div className="profile-info">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Student ID:</strong> {student.studentId}</p>
              <p><strong>Program:</strong> {student.program}</p>
              <p><strong>Year:</strong> {student.year}</p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={student.name} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={student.email} onChange={handleChange} />
              </label>
              <label>
                Program:
                <input type="text" name="program" value={student.program} onChange={handleChange} />
              </label>
              <label>
                Year:
                <input type="text" name="year" value={student.year} onChange={handleChange} />
              </label>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditing(false)}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;