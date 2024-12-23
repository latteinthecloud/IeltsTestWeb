import React, { useState } from "react";
import "./FilterBarExercise.css";

interface FilterBarProps {
  onFilterChange: (filter: string) => void; // Hàm nhận filter dưới dạng chuỗi
}

const FilterBarExercise = ({ onFilterChange }: FilterBarProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State để điều khiển modal
  const [selectedSkill, setSelectedSkill] = useState<string>("reading"); // State lưu skill được chọn

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter); // Gửi filter đã chọn lên component cha
  };

  const handleCreateClick = () => {
    setActiveFilter("create"); // Đặt trạng thái active cho nút Create
    setIsModalOpen(true); // Hiển thị modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal
  };

  const handleSkillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(event.target.value); // Cập nhật giá trị skill được chọn
  };

  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        <button
          className={`filter-button ${
            activeFilter === "all" ? "active all-active" : "all-active"
          }`}
          onClick={() => handleFilterClick("all")}
        >
          <i className="fas fa-border-all"></i> All Skills
        </button>
        <button
          className={`filter-button ${
            activeFilter === "listening"
              ? "active listening-active"
              : "listening-active"
          }`}
          onClick={() => handleFilterClick("listening")}
        >
          <i className="fas fa-headphones-alt"></i> Listening
        </button>
        <button
          className={`filter-button ${
            activeFilter === "reading"
              ? "active reading-active"
              : "reading-active"
          }`}
          onClick={() => handleFilterClick("reading")}
        >
          <i className="fas fa-book"></i> Reading
        </button>
        <button
          className={`filter-button ${
            activeFilter === "create" ? "active create-active" : "create-active"
          }`}
          onClick={handleCreateClick}
        >
          <i className="fa-solid fa-plus"></i> Create
        </button>
      </div>

      {/* Modal trực tiếp */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h2>Create new test</h2>
            <form>
              <div className="name-skill">
                <div className="form-group-hint">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Hint..." />
                </div>
                <div className="form-group-skill">
                  <label htmlFor="skill">Skill</label>
                  <div className="custom-select-container">
                    <select
                      id="skill"
                      className="custom-select"
                      value={selectedSkill} // Liên kết với state
                      onChange={handleSkillChange} // Xử lý thay đổi skill
                    >
                      <option value="reading">Reading</option>
                      <option value="listening">Listening</option>
                    </select>
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </div>
              </div>

              {/* Hiển thị nội dung dựa trên selectedSkill */}
              {selectedSkill === "reading" && (
                <div className="reading">
                  <div className="name-skill">
                    <div className="s1-s2">
                      <div className="form-group-s1">
                        <label htmlFor="section1">Section 1</label>
                        <select id="section1">
                          <option value="multiple-choice">
                            Multiple Choice
                          </option>
                          <option value="matching">Matching</option>
                          <option value="complete">Complete</option>
                          <option value="true_false">True/False</option>
                          <option value="diagram">Diagram</option>
                        </select>
                      </div>
                      <div className="form-group-s2">
                        <label htmlFor="section2">Section 2</label>
                        <select id="section2">
                          <option value="multiple-choice">
                            Multiple Choice
                          </option>
                          <option value="matching">Matching</option>
                          <option value="complete">Complete</option>
                          <option value="true_false">True/False</option>
                          <option value="diagram">Diagram</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group-s1">
                      <label htmlFor="section3">Section 3</label>
                      <select id="section3">
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="matching">Matching</option>
                        <option value="complete">Complete</option>
                        <option value="true_false">True/False</option>
                        <option value="diagram">Diagram</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {selectedSkill === "listening" && (
                <div className="listening">
                  <label>Selected types</label>
                  <div className="lis-type">
                    <select id="section1">
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="matching">Matching</option>
                      <option value="complete">Complete</option>
                      <option value="true_false">True/False</option>
                      <option value="diagram">Diagram</option>
                    </select>

                    <select id="section1">
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="matching">Matching</option>
                      <option value="complete">Complete</option>
                      <option value="true_false">True/False</option>
                      <option value="diagram">Diagram</option>
                    </select>
                  </div>
                </div>
              )}

              <button type="submit" className="confirm-button">
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBarExercise;
