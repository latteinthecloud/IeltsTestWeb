import React, { useState } from "react";
import "../styles/Profile.css";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const email=user.email;
  const [goal, setGoal] = useState("Become a React expert!"); // Replace with dynamic data
  const [avatar, setAvatar] = useState("https://www.wikihow.tech/skins/owl/images/wikihow_logo_tech_4.png");
  const [uploadedImage, setUploadedImage] = useState(null);
  const { isAuthenticated, logout, user } = useAuth(); // Access auth state and functions
  // Handle goal update
  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Update avatar with the uploaded image
      };
      reader.readAsDataURL(file);
      setUploadedImage(file.name); // Optional: Store uploaded file name
    }
  };

  // Handle save button click (simulate saving the profile)
  const handleSave = () => {
    // In real scenarios, save to API or localStorage here
    console.log("Profile saved!");
    alert("Profile has been saved successfully!");
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-content">
        {/* Avatar Section */}
        <div className="avatar-section">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <label htmlFor="upload-avatar" className="upload-label">
            Upload New Image
          </label>
          <input 
            id="upload-avatar" 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="upload-input" 
          />
          {uploadedImage && <p>Uploaded: {uploadedImage}</p>}
        </div>

        {/* Email Section */}
        <div className="info-section">
          <p><strong>Email:</strong> {email}</p>
        </div>

        {/* Goal Section */}
        <div className="goal-section">
          <p><strong>Goal:</strong></p>
          <textarea
            value={goal}
            onChange={handleGoalChange}
            className="goal-input"
            rows="3"
          />
        </div>

        {/* Save Button */}
        <div className="save-section">
          <button onClick={handleSave} className="save-button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
