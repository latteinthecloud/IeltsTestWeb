import React, { useState, useEffect } from 'react';
import sectionApi from "../../api/sectionApi"; // Ensure you have this API to handle the creation of reading sections
import { useLocation } from "react-router-dom";
import "./AdminAddSectionR.css"; // Import the CSS file for styling

const AdminAddSectionR = () => {
  const [forms, setForms] = useState([]); // State to manage dynamic forms for sections
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const location = useLocation();
  const { testId, testSkill } = location.state || {}; // Get testId and testSkill from the location state

  // Number of forms to render based on the skill (for reading sections, it's 3 by default)
  const numForms = 3;

  // Initialize the forms when the component mounts or when testSkill changes
  useEffect(() => {
    const initialForms = [];
    for (let i = 0; i < numForms; i++) {
      initialForms.push({
        title: '',
        content: '',
        questionList: [
          { qlistId: 0, content: '', choiceList: '', answer: '' }, // First questionList
          { qlistId: 1, content: '', choiceList: '', answer: '' }  // Second questionList
        ]
      });
    }
    setForms(initialForms);
  }, [testSkill]);

  // Handle input change for section fields (title, content)
  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index] = { ...updatedForms[index], [name]: value };
    setForms(updatedForms);
  };

  // Handle input change for questionList fields (content, choiceList, answer)
  const handleQuestionChange = (sectionIndex, questionIndex, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[sectionIndex].questionList[questionIndex] = {
      ...updatedForms[sectionIndex].questionList[questionIndex],
      [name]: value
    };
    setForms(updatedForms);
  };

  // Handle form submission for each section
  const handleSubmit = async (index, e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { title, content, questionList } = forms[index];

    try {
      // Create reading section using the API
      const response = await sectionApi.createRead({ testId, title, content, questionList });

      // Set success message
      setSuccess(`Section ${index + 1} created successfully!`);

      // Optionally, reset the form or clear it after submission
      const updatedForms = [...forms];
      updatedForms[index] = { title: '', content: '', questionList: [
        { qlistId: 0, content: '', choiceList: '', answer: '' },
        { qlistId: 1, content: '', choiceList: '', answer: '' }
      ]};
      setForms(updatedForms);
    } catch (err) {
      setError('Failed to create section: ' + err.message);
    }
  };

  return (
    <div className="admin-add-section">
      <h2>Add Reading Section</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      
      {forms.map((form, index) => (
        <form key={index} onSubmit={(e) => handleSubmit(index, e)} className="section-form">
          <div className="form-group">
            <label htmlFor={`title-${index}`}>Title:</label>
            <input
              type="text"
              id={`title-${index}`}
              name="title"
              value={form.title}
              onChange={(e) => handleSectionChange(index, e)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor={`content-${index}`}>Content:</label>
            <textarea
              id={`content-${index}`}
              name="content"
              value={form.content}
              onChange={(e) => handleSectionChange(index, e)}
              required
            />
          </div>

          {/* Render each QuestionList inside the section */}
          {form.questionList.map((question, qIndex) => (
            <div key={qIndex} className="question-list">
              <h3>Question {qIndex + 1}</h3>
              
              <div className="form-group">
                <label htmlFor={`question-content-${index}-${qIndex}`}>Question Content:</label>
                <input
                  type="text"
                  id={`question-content-${index}-${qIndex}`}
                  name="content"
                  value={question.content}
                  onChange={(e) => handleQuestionChange(index, qIndex, e)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor={`choiceList-${index}-${qIndex}`}>Choice List (comma separated):</label>
                <input
                  type="text"
                  id={`choiceList-${index}-${qIndex}`}
                  name="choiceList"
                  value={question.choiceList}
                  onChange={(e) => handleQuestionChange(index, qIndex, e)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`answer-${index}-${qIndex}`}>Answer:</label>
                <input
                  type="text"
                  id={`answer-${index}-${qIndex}`}
                  name="answer"
                  value={question.answer}
                  onChange={(e) => handleQuestionChange(index, qIndex, e)}
                  required
                />
              </div>
            </div>
          ))}
          
          <button type="submit" className="submit-btn">Create Section {index + 1}</button>
        </form>
      ))}
    </div>
  );
};

export default AdminAddSectionR;
