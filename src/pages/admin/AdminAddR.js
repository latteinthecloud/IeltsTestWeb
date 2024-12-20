import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import sectionApi from "../../api/sectionApi"; // Đường dẫn tới API

const AdminAddR = ({ numberOfSections = 3 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy testId từ useLocation
  const searchParams = new URLSearchParams(location.search);
  const testId = searchParams.get("testId");

  const [sections, setSections] = useState(
    Array.from({ length: numberOfSections }, (_, index) => ({
      num: index + 1,
      title: "",
      content: "",
      contentFile: null,
      imageFile: null,
    }))
  );

  const handleInputChange = (num, field, value) => {
    const updatedSections = sections.map((section) =>
      section.num === num ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleFileUpload = (num, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const formattedContent = fileContent.replace(/\n/g, "<br>");
      handleInputChange(num, "content", formattedContent);
    };
    reader.readAsText(file);
    handleInputChange(num, "contentFile", file);
  };

  const handleAddSection = async (num) => {
    const section = sections.find((sec) => sec.num === num);

    if (!section.title || !section.content) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung trước khi tạo phần!");
      return;
    }

    try {
      const response = await sectionApi.createRead({
        testId,
        title: section.title,
        content: section.content,
      });
      if (response.status === 200 || response.status === 201) {
        alert("Tạo Section Reading thành công!");
      } else {
        alert("Đã xảy ra lỗi khi tạo Section Reading.");
      }

      // if (response.status == 200) {
      //   // Đảm bảo trạng thái là 200
      //   alert("Tạo Section Reading thành công!");
      //   navigate(`/admin-add-test/admin-add-sectionR?testId=${testId}`);
      // } else {
      //   console.error("Phản hồi API không thành công:", response);
      //   alert("Đã xảy ra lỗi khi tạo Section Reading.");
      // }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error.response || error.message);
      alert("Không thể tạo Section Reading. Vui lòng thử lại sau.");
    }
  };

  return (
    <div>
      <h3>Total Questions: {sections.length}</h3>

      {sections.map((section) => (
        <div key={section.num} className="container">
          <h4>
            <i className="fa-solid fa-circle"></i> Section {section.num}
          </h4>

          {/* Title */}
          <div className="layout">
            <label>Title: </label>
            <input
              type="text"
              placeholder="Enter section title"
              value={section.title}
              onChange={(e) =>
                handleInputChange(section.num, "title", e.target.value)
              }
            />
          </div>

          {/* Content */}
          <div className="layout">
            <label>Content: </label>
            <div className="file-wrapper">
              <input
                type="text"
                placeholder="Browse your file"
                value={section.contentFile ? section.contentFile.name : ""}
                readOnly
              />
              <input
                type="file"
                id={`content-${section.num}`}
                className="hidden-file-input"
                onChange={(e) =>
                  handleFileUpload(section.num, e.target.files[0])
                }
              />
              <label htmlFor={`content-${section.num}`} className="icon-button">
                <i className="fa-solid fa-arrow-up-from-bracket file-upload-icon"></i>
              </label>
            </div>
          </div>

          {/* Formatted Content Preview */}
          <div className="layout">
            <label>Preview: </label>
            <div
              className="content-preview"
              dangerouslySetInnerHTML={{ __html: section.content }}
            ></div>
          </div>

          {/* Image */}
          <div className="layout">
            <label>Image: </label>
            <div className="file-wrapper">
              <input
                type="text"
                placeholder="Browse your file"
                value={section.imageFile ? section.imageFile.name : ""}
                readOnly
              />
              <input
                type="file"
                id={`image-${section.num}`}
                className="hidden-file-input"
                onChange={(e) =>
                  handleInputChange(section.num, "imageFile", e.target.files[0])
                }
              />
              <label htmlFor={`image-${section.num}`} className="icon-button">
                <i className="fa-solid fa-arrow-up-from-bracket file-upload-icon"></i>
              </label>
            </div>
          </div>

          {/* Add Section Button */}
          <div className="add-section">
            <button
              onClick={() => handleAddSection(section.num)}
              className="add-button"
            >
              <i className="fa-solid fa-circle-plus"></i> Parts
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAddR;
