import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/images.png";
import uploadButton from "../assets/UploadButton.png";
import savechangeButton from "../assets/OvanButton.png";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate(); 
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [goal, setGoal] = useState("5.0");
  const email = "anna123@gmail.com";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResetPassword = () => {
    // Navigate to Verify page with email as state
    navigate("/verify", { state: { email: "anna123@gmail.com" } });
  };

  const handleSave = () => {
    alert("Profile saved!");
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-content">
        {/* Avatar Section */}
        <div className="avatar-section">
          <img src={avatar} alt="Avatar" className="avatar" />
          
          <img
            src={uploadButton}  
            alt="Upload Avatar"
            className="upload-button"
            style={{ cursor: "pointer" }}  
            onClick={() => document.getElementById('upload-avatar').click()}  
          />

          <input
            id="upload-avatar"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="upload-input"
          />
        </div>

        {/* Email Section */}
        <div className="info-section">
          <label>Email</label>
          <input
            type="email"
            value={email}
            className="input-field"
            readOnly
          />
        </div>

        {/* Goal Section */}
        <div className="goal-section">
          <label>Goal</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Reset Password Link */}
        <a href="#" className="link" onClick={handleResetPassword}>
          Reset Password
        </a>

        {/* Save Button */}
        <div className="save-section">
    
          <img
            src={savechangeButton}  
            alt="Save Changes"
            className="save-button"
            style={{ cursor: "pointer" }}  
            onClick={handleSave}  
          />
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
