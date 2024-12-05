import React, { useState } from 'react';
import createLis from '../../api/sectionApi'; // Import API
import "./AdminAddSection.css"; // Import CSS

const AdminAddSection = () => {
  const [testData, setTestData] = useState({
    sectionOrder: '', // Section order
    timeStamp: '', // Timestamp
    transcript: '', // Transcript
    soundId: '', // Sound ID
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestData({
      ...testData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Gọi API để tạo bài kiểm tra nghe
      const response = await createLis(testData);

      // Xử lý kết quả trả về từ API
      setSuccess('Bài kiểm tra nghe đã được tạo thành công!');
      console.log('Response:', response);
    } catch (err) {
      setError('Lỗi khi tạo bài kiểm tra nghe: ' + err.message);
      console.error('Error:', err);
    }
  };

  return (
    <div className="admin-add-section">
      <h2>Add Listening Test</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sectionOrder">Section Order</label>
          <input
            type="text"
            id="sectionOrder"
            name="sectionOrder"
            value={testData.sectionOrder}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="timeStamp">Timestamp</label>
          <input
            type="text"
            id="timeStamp"
            name="timeStamp"
            value={testData.timeStamp}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="transcript">Transcript</label>
          <textarea
            id="transcript"
            name="transcript"
            value={testData.transcript}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="soundId">ID âm thanh</label>
          <input
            type="text"
            id="soundId"
            name="soundId"
            value={testData.soundId}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Tạo Bài Kiểm Tra Nghe</button>
      </form>
    </div>
  );
};

export default AdminAddSection;
