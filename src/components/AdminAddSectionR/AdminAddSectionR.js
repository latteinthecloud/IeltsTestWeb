import React, { useState, useEffect } from 'react';
import sectionApi from "../../api/sectionApi"; // Đảm bảo rằng bạn đã có API này để tạo section
import questionListApi from "../../api/questionListApi"; // Import API tạo question list
import { useLocation } from "react-router-dom";
import "./AdminAddSectionR.css"; // Import file CSS để styling

const AdminAddSectionR = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false); // State để hiển thị form question list
  const [questionContent, setQuestionContent] = useState('');
  const [questionListType, setQuestionListType] = useState('multiple_choice'); // Mặc định là 'multiple_choice'
  const [sectionId, setSectionId] = useState(0); // Chỉnh sửa sectionId nếu cần
  const [sectionType, setSectionType] = useState('reading'); // sectionType mặc định là 'reading'

  const location = useLocation();
  const { testId, testSkill } = location.state || {}; // Lấy testId và testSkill từ location state

  useEffect(() => {
    // Lấy sectionType từ trang createTest (ví dụ: nếu có phần cấu hình cho testSkill)
    if (testSkill) {
      setSectionType(testSkill); // Hoặc là logic xử lý khác
    }
  }, [testSkill]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    } else if (name === "questionContent") {
      setQuestionContent(value);
    } else if (name === "questionListType") {
      setQuestionListType(value);
    }
  };

  const handleAddQuestionList = () => {
    // Chuyển trạng thái để hiển thị form
    setShowQuestionForm(true);
  };

  const handleSubmitQuestionList = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = {
      sectionId, // Sử dụng sectionId đã có
      sectionType, // Sử dụng sectionType từ testSkill hoặc mặc định 'reading'
      questionListType, // Loại câu hỏi được chọn từ combobox
      content: questionContent, // Nội dung câu hỏi
    };

    try {
      // Gọi API tạo question list
      const response = await questionListApi.create(data);

      // Set success message
      setSuccess('Question List created successfully!');

      // Reset form sau khi tạo question list thành công
      setQuestionContent('');
      setShowQuestionForm(false);
    } catch (err) {
      setError('Failed to create question list: ' + err.message);
    }
  };

  const handleSubmitSection = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await sectionApi.createRead({ testId, title, content });

      setSuccess('Section created successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      setError('Failed to create section: ' + err.message);
    }
  };

  return (
    <div className="admin-add-section">
      <h2>Add Reading Section</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {/* Form tạo Section */}
      <form onSubmit={handleSubmitSection} className="section-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Create Section</button>
      </form>

      {/* Nút Add Question List */}
      <button onClick={handleAddQuestionList} className="add-question-btn">
        Add Question List
      </button>

      {/* Form thêm Question List nếu bấm nút "Add Question List" */}
      {showQuestionForm && (
        <form onSubmit={handleSubmitQuestionList} className="question-list-form">
          <div className="form-group">
            <label htmlFor="questionListType">Question List Type:</label>
            <select
              id="questionListType"
              name="questionListType"
              value={questionListType}
              onChange={handleInputChange}
              required
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="matching">Matching</option>
              <option value="true_false">True/False</option>
              <option value="complete">Complete</option>
              <option value="diagram">Diagram</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="questionContent">Question Content:</label>
            <textarea
              id="questionContent"
              name="questionContent"
              value={questionContent}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Create Question List</button>
        </form>
      )}
    </div>
  );
};

export default AdminAddSectionR;
