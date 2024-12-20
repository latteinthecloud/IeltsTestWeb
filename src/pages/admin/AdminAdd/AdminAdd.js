import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminAdd.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/400.css";
import Section from "../../../components/Section/Section";
import SectionListen from "../../../components/SectionListen/SectionListen";

const AdminAdd = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải file
  const [formData, setFormData] = useState({
    name: "",
    editionMonth: "1",
    editionYear: "",
    skill: "reading",
    type: "academic",
    sound: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIconClick = () => {
    // Tạo input file tạm thời
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "audio/mpeg, audio/wav"; // Chỉ chấp nhận file âm thanh .mp3 và .wav

    // Khi người dùng chọn file
    fileInput.onchange = (event) => {
      const file = event.target.files[0];

      if (!file) {
        alert("Vui lòng chọn file!");
        return;
      }

      if (!["audio/mpeg", "audio/wav"].includes(file.type)) {
        alert("Chỉ chấp nhận file âm thanh định dạng .mp3 hoặc .wav!");
        return;
      }

      // Lưu file vào state
      setFormData((prev) => ({ ...prev, sound: file }));
      alert("Tệp âm thanh đã được chọn!");
    };

    // Tự động mở hộp thoại chọn file
    fileInput.click();
  };

  const handleConfirm = async () => {
    try {
      if (!formData.name || !formData.editionYear) {
        alert("Vui lòng điền đầy đủ thông tin trước khi tạo bài kiểm tra!");
        return;
      }

      // Gọi API tạo bài kiểm tra
      const response = await axios.post("/Test", {
        testType: formData.type,
        testSkill: formData.skill,
        name: formData.name,
        monthEdition: formData.editionMonth,
        yearEdition: formData.editionYear,
      });

      if (response.status === 200) {
        const testId = response.data.testId; // Lấy testId từ phản hồi của API

        alert("Tạo bài kiểm tra thành công!");

        // Nếu là bài kiểm tra listening, upload âm thanh
        if (formData.skill === "listening" && formData.sound) {
          try {
            const soundFormData = new FormData();
            soundFormData.append("file", formData.sound); // Thêm file vào FormData

            // Gọi API upload âm thanh
            const soundResponse = await axios.post(
              `/Sound/${testId}`,
              soundFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data", // Gửi dạng multipart
                },
              }
            );

            if (soundResponse.status === 200) {
              alert("Upload âm thanh thành công!");
            } else {
              alert("Có lỗi khi upload âm thanh. Vui lòng thử lại.");
            }
          } catch (soundError) {
            console.error("Lỗi khi upload âm thanh:", soundError);
            alert("Không thể upload âm thanh. Vui lòng thử lại sau.");
          }
        }

        // Điều hướng tới trang phù hợp
        if (formData.skill === "reading") {
          navigate(`/admin-add-test/admin-add-sectionR?testId=${testId}`);
        } else if (formData.skill === "listening") {
          navigate(`/admin-add-test/admin-add-section?testId=${testId}`);
        }
      } else {
        alert("Có lỗi xảy ra khi tạo bài kiểm tra! Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể tạo bài kiểm tra. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="create-test-container">
      <div className="title">Create new test</div>
      <div className="section-title">
        <span className="general">1. General</span>
      </div>
      <div className="form-content">
        <div className="form-group1">
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
          <div className="group">
            <div className="header">Edition</div>
            <div className="edition-group">
              <select
                name="editionMonth"
                value={formData.editionMonth}
                onChange={handleInputChange}
              >
                {[...Array(12).keys()].map((month) => (
                  <option key={month + 1} value={month + 1}>
                    {month + 1}
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
        <div className="form-group2">
          <div className="group1">
            <div className="group">
              <div className="header">Skill</div>
              <select
                name="skill"
                value={formData.skill}
                onChange={handleInputChange}
              >
                <option>reading</option>
                <option>listening</option>
              </select>
            </div>
            <div className="group">
              <div className="header">Type</div>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option>academic</option>
                <option>general</option>
              </select>
            </div>
          </div>
          {formData.skill === "listening" && (
            <div className="group">
              <div className="header">Sound</div>
              <div className="groupSound">
                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  placeholder="Browse your file"
                  readOnly
                  value={formData.sound || ""}
                />
                <i
                  className="fa-solid fa-arrow-up-from-bracket file-upload-icon"
                  onClick={handleIconClick}
                ></i>
              </div>
              {isLoading && <p>Đang tải file lên...</p>}
            </div>
          )}
        </div>
      </div>
      <div className="confirm-btn" onClick={handleConfirm}>
        Confirm
      </div>
    </div>
  );
};

export default AdminAdd;
