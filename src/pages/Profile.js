import React, { useState, useEffect } from "react";
import upload_Button from "../assets/UploadButton.png";
import "../styles/Profile.css";
import RoundedButton from "../components/RoundedButton/RoundedButton.tsx";
import UploadButton from "../components/UploadButton/UploadButton.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import accountApi from "../api/accountApi.js";
import { useAvatar } from "../context/AvatarContext.js";

const Profile = () => {
  const { avatar, setAvatar } = useAvatar();
  const [goal, setGoal] = useState(0);
  const navigate = useNavigate();
  const {user} = useAuth();
  const email = user.email;
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(avatar);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await accountApi.get(user.id);
        setGoal(response.goal);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchUser();
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImg(URL.createObjectURL(file));
    setFile(file);
  };

  const handleSave = async () => {
    alert("Profile saved!");
    try{
      if(file !== null)
      {
        await accountApi.updateImage(user.id, file);
        const response = await accountApi.getAvatar(user.id);
        setAvatar(response);
      }
      const request = {
        goal: goal
      }
      await accountApi.update(user.id, request);
    }
    catch(error){
      console.log(error);
    }
  };

  const handleNavigation = () =>{
    navigate("/enterPassword", { state: { email } });
  }

  return (
    <div className="outer">
      <h2>Profile</h2>
      <div className="profile-container">
        <div className="profile-content">
          {/* Avatar Section */}
          <div className="avatar-section">
            <img src={img} alt="Avatar" className="avatar" />
            
            <UploadButton
              title="Upload Avatar"
              onClick={() => document.getElementById("upload-avatar")?.click()} 
              icon={<img src={upload_Button} alt="Upload Button" className="upload-icon" />} 
              onFileChange={handleImageUpload} 
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
          <u className="reset-link" onClick={handleNavigation}>
            Reset password
          </u>
          {/* Save Button */}
          <div className="save-section">
      
          <RoundedButton 
            title="Save Changes"
            onClick={handleSave}
            colors={["#33B2C7","#26868B"]}
          />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
