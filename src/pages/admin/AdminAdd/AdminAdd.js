import React, { useState } from "react";
import "./AdminAdd.css";
import "@fontsource/poppins/700.css"; /* Bold */
import "@fontsource/poppins/600.css"; /* SemiBold */
import "@fontsource/poppins/400.css"; /* Regular */
import Section from "../../../components/Section/Section";
import SectionListen from "../../../components/SectionListen/SectionListen";

const AdminAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    editionMonth: "January",
    editionYear: "",
    skill: "Reading",
    type: "Academic",
    sound: "", // Thêm state cho Sound
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="create-test-container">
      <div className="title">Create new test</div>
      <div className="section-title">
        <span className="general">1. General</span>
      </div>
      <div className="form-content">
        <div className="form-group1">
          {/* Name */}
          <div className="group">
            <div className="header">Name</div>
            <input
              type="text"
              name="name"
              placeholder="Enter test name..."
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Edition */}
          <div className="group">
            <div className="header">Edition</div>
            <div className="edition-group">
              <select
                name="editionMonth"
                value={formData.editionMonth}
                onChange={handleInputChange}
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="editionYear"
                placeholder="Enter year"
                value={formData.editionYear}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Skill và Type */}
        <div className="form-group2">
          {/* Skill */}
          <div className="group1">
            <div className="group">
              <div className="header">Skill</div>
              <select
                name="skill"
                value={formData.skill}
                onChange={handleInputChange}
              >
                <option>Reading</option>
                <option>Listening</option>
              </select>
            </div>

            {/* Type */}
            <div className="group">
              <div className="header">Type</div>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option>Academic</option>
                <option>General</option>
              </select>
            </div>
          </div>

          {/* Sound Track - Hiển thị chỉ khi skill là Listening */}
          {formData.skill === "Listening" && (
            <div className="group">
              <div className="header">Sound</div>
              <select
                name="sound"
                value={formData.sound}
                onChange={handleInputChange}
              >
                <option value="">Select Sound</option>
                <option>Sound track 1</option>
                <option>Sound track 2</option>
                <option>Sound track 3</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <div className="section-title">
          <span className="general">2. Sections</span>
        </div>
        {/* Kiểm tra nếu skill là "Listening", thì gọi component SectionListen */}
        {formData.skill === "Listening" ? (
          <SectionListen numberOfSections={4} />
        ) : (
          <Section numberOfSections={3} />
        )}
      </div>
      <div className="confirm-btn">Confirm</div>
    </div>
  );
};

export default AdminAdd;
