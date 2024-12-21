import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import sectionApi from "../../api/sectionApi";
import "../admin/AdminAdd/AdminAdd.css";

const AdminAddR = ({ numberOfSections = 3 }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
  const handleUpload = async (num, file) => {
    if (!file) {
      alert("Vui lòng chọn tệp trước khi tải lên!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await sectionApi.uploadContent(formData);

      if (response && typeof response === "string") {
        alert("Tải lên thành công!");

        // Cập nhật state
        setSections((prevSections) =>
          prevSections.map((sec) =>
            sec.num === num
              ? {
                  ...sec,
                  contentFile: file,
                  content: response,
                }
              : sec
          )
        );
      } else {
        alert("Phản hồi không phải là HTML.");
      }
    } catch (error) {
      console.error("Lỗi khi tải lên:", error);
      alert("Có lỗi xảy ra trong quá trình tải file. Vui lòng thử lại!");
    }
  };

  const handleFileUpload = async (num, file) => {
    if (!file) {
      alert("Vui lòng chọn tệp!");
      return;
    }

    try {
      console.log("File được chọn:", file);

      setSections((prevSections) =>
        prevSections.map((section) =>
          section.num === num ? { ...section, contentFile: file } : section
        )
      );

      // Truyền file trực tiếp vào handleUpload
      await handleUpload(num, file);
    } catch (error) {
      console.error("Lỗi trong quá trình tải file:", error);
      alert("Có lỗi xảy ra trong quá trình tải file. Vui lòng thử lại!");
    }
  };

  const handleAddSection = async (num) => {
    const section = sections.find((sec) => sec.num === num);

    if (!section) {
      alert("Không tìm thấy section!");
      return;
    }

    // Kiểm tra tiêu đề
    if (!section.title) {
      alert("Vui lòng nhập tiêu đề trước khi tạo phần!");
      return;
    }

    // Kiểm tra nội dung
    if (!section.content || section.content === "No preview available.") {
      alert("Vui lòng tải lên tệp và cập nhật nội dung trước khi tạo phần!");
      return;
    }

    try {
      const response = await sectionApi.createRead({
        testId,
        title: section.title,
        content: section.content,
      });

      if (response.status === 200 || response.status === 201) {
        alert(`Tạo Section Reading thành công cho Section ${num}!`);

        const updatedSections = sections.map((sec) =>
          sec.num === num ? { ...sec, completed: true } : sec
        );
        setSections(updatedSections);
      } else {
        alert("Đã xảy ra lỗi khi tạo Section Reading.");
      }
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
              type="textTitle"
              placeholder="Enter section title"
              value={section.title}
              onChange={(e) =>
                handleInputChange(section.num, "title", e.target.value)
              }
              style={{
                width: "427px",
              }}
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
                } // Tự động gọi hàm khi chọn file
              />
              <label htmlFor={`content-${section.num}`} className="icon-button">
                <i className="fa-solid fa-arrow-up-from-bracket file-upload-icon"></i>
              </label>
            </div>
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
