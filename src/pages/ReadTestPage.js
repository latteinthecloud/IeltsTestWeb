import React, { useState, useEffect, useRef } from "react";
import "../styles/ReadTestPage.css"; 

const ReadTestPage = () => {
  // State để lưu trữ câu trả lờin
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(32 * 60);
  const [isStarted, setIsStarted] = useState(false); // State để kiểm tra xem timer đã bắt đầu chưa
  const [showStartPopup, setShowStartPopup] = useState(true); // State để hiển thị popup Start
  const [showSubmitPopup, setShowSubmitPopup] = useState(false); // State để hiển thị popup Submit khi hết thời gian

  const [volume, setVolume] = useState(100);  // Default volume
  const [isMuted, setIsMuted] = useState(false);  // Mute status
  const audioRef = useRef(new Audio("/path/to/your/audio/file.mp3"));

  const [activePart, setActivePart] = useState(1);
  const questionRefs = useRef([]);

  const questions = [
    // Part 1 (Câu 1 đến 10)
    [
      { question: "Question 1", number: 1 },
      { question: "Question 2", number: 2 },
      { question: "Question 3", number: 3 },
      { question: "Question 4", number: 4 },
      { question: "Question 5", number: 5 },
      { question: "Question 6", number: 6 },
      { question: "Question 7", number: 7 },
      { question: "Question 8", number: 8 },
      { question: "Question 9", number: 9 },
      { question: "Question 10", number: 10 },
    ],
    // Part 2 (Câu 11 đến 20)
    [
      { question: "Question 11", number: 11 },
      { question: "Question 12", number: 12 },
      { question: "Question 13", number: 13 },
      { question: "Question 14", number: 14 },
      { question: "Question 15", number: 15 },
      { question: "Question 16", number: 16 },
      { question: "Question 17", number: 17 },
      { question: "Question 18", number: 18 },
      { question: "Question 19", number: 19 },
      { question: "Question 20", number: 20 },
    ],
    // Part 3 (Câu 21 đến 30)
    [
      { question: "Question 21", number: 21 },
      { question: "Question 22", number: 22 },
      { question: "Question 23", number: 23 },
      { question: "Question 24", number: 24 },
      { question: "Question 25", number: 25 },
      { question: "Question 26", number: 26 },
      { question: "Question 27", number: 27 },
      { question: "Question 28", number: 28 },
      { question: "Question 29", number: 29 },
      { question: "Question 30", number: 30 },
    ],
    // Part 4 (Câu 31 đến 40)
    [
      { question: "Question 31", number: 31 },
      { question: "Question 32", number: 32 },
      { question: "Question 33", number: 33 },
      { question: "Question 34", number: 34 },
      { question: "Question 35", number: 35 },
      { question: "Question 36", number: 36 },
      { question: "Question 37", number: 37 },
      { question: "Question 38", number: 38 },
      { question: "Question 39", number: 39 },
      { question: "Question 40", number: 40 },
    ],
  ];

  // Hàm cuộn đến câu hỏi tương ứng
  const scrollToQuestion = (questionIndex) => {
    const questionElement = questionRefs.current[questionIndex];
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Khi nhấn vào câu hỏi trong question palette
  const handleQuestionClick = (questionNum) => {
    scrollToQuestion(questionNum - 1); // Mảng `questionRefs` bắt đầu từ 0, còn câu hỏi từ 1
  };


  // Hàm xử lý khi người dùng click vào phần câu hỏi
  const handlePartClick = (partNumber) => {
    setActivePart(partNumber);
  };

  // Hàm xử lý thay đổi nội dung nhập liệu
  const handleChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10); // Get the new volume as an integer
    setVolume(newVolume);

    if (newVolume === 0) {
      setIsMuted(true); // Automatically mute if volume is 0
      audioRef.current.muted = true;
    } else {
      setIsMuted(false); // Unmute if volume is greater than 0
      audioRef.current.muted = false;
      audioRef.current.volume = newVolume / 100; // Update the audio volume
    }
  };

  // Toggle mute/unmute on icon click
  const toggleMute = () => {
    setIsMuted((prev) => !prev);

    if (isMuted) {
      // Unmute: restore the previous volume
      setVolume(100);
      audioRef.current.muted = false;
      audioRef.current.volume = 1;
    } else {
      // Mute: set volume to 0
      setVolume(0);
      audioRef.current.muted = true;
    }
  };
  
  const handleStartClick = () => {
    setShowStartPopup(false); // Ẩn popup khi nhấn Start
    setIsStarted(true); // Đặt trạng thái "started" thành true để bắt đầu đếm ngược
  };

  const handleSubmitClick = () => {
    alert("Your answers have been submitted!");
    // Có thể xử lý thêm logic submit ở đây
  };

  useEffect(() => {
    if (!isStarted || timeRemaining <= 0) return; // Dừng khi hết thời gian hoặc chưa bắt đầu

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer); // Dừng timer khi hết thời gian
          setShowSubmitPopup(true); // Hiển thị popup submit
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup khi component bị hủy
  }, [isStarted, timeRemaining]);

  // Hàm chuyển thời gian còn lại thành định dạng MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
  };

  const isAnswered = (questionNumber) => {
    return answers[questionNumber] !== undefined;
  };

  // Hàm đếm số câu trả lời đã được làm trong mỗi phần
  const countAnsweredQuestions = (partNumber) => {
    let count = 0;
    for (let i = (partNumber - 1) * 10 + 1; i <= partNumber * 10; i++) {
      if (answers[i] !== undefined) count++;
    }
    return count;
  };

  return (
    <div className="ReadTestPage">
      <div className="Read-header">
        <h1>IELTS Reading Practice Test</h1>
        <div className="timer">{formatTime(timeRemaining)} remaining</div>  
        <button className="submit-btn">Submit</button>
        <div className="audio-control">
        <i
      className={`fa-solid ${isMuted || volume === 0 ? "fa-volume-xmark" : "fa-volume-high"}`}
      onClick={toggleMute}
        ></i>
          <div className="volume-slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        </div>
        
      </div>
      <div className="instructions">
        <p>
          Complete the form below.
          <br />
          <strong>Write NO MORE THAN THREE WORDS AND/OR A NUMBER for each answer.</strong>
        </p>
      </div>

        {/* Popup Start Button */}
        {showStartPopup && (
            <div className="popup">
            <div className="popup-content">
                <h2>Click Start to Begin the Test</h2>
                <button className="start-btn" onClick={handleStartClick}>
                Start
                </button>
            </div>
            </div>
        )}
        {/* Popup Submit Button (Hiển thị khi hết thời gian) */}
      {showSubmitPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Time is up! Please submit your answers.</h2>
            <button className="submit-btn" onClick={handleSubmitClick}>
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="Read-form-container">
  <div className="reading-content">
    {/* Nội dung bài đọc (Reading Content) */}
    <div className="reading-text">
      <p>Reading content goes here. This can be a long text that requires scrolling to read.</p>
      <p>Another paragraph...</p>
      {/* Thêm nội dung bài đọc vào đây */}
    </div>
  </div>
  
  <div className="questions-container">
    {/* Form hiển thị câu hỏi theo phần */}
    <div className="Read-form-group">
      {questions[activePart - 1].map((question, i) => (
        <p key={question.number} ref={(el) => (questionRefs.current[question.number - 1] = el)}>
          <strong>{question.number}.</strong> {question.question}
          <input
            type="text"
            value={answers[question.number] || ""}
            onChange={(e) => handleChange(question.number, e.target.value)}
            placeholder="Enter your answer"
          />
        </p>
            ))}
            </div>
        </div>
    </div>

      {/* Question Palette (Part 1, 2, 3, 4) */}
      <section className="question-palette">
        {[1, 2, 3, 4].map((partNumber) => (
          <div
            key={partNumber}
            className={`question-palette__part ${activePart === partNumber ? "-active" : ""}`}
            onClick={() => handlePartClick(partNumber)}
            style={{ backgroundColor: activePart === partNumber ? "white" : "" }} // Thay đổi nền khi chọn
          >
            <div className="question-palette__part-title">
              Part {partNumber} <span>:</span>
            </div>
            <div className="question-palette__part-status">
              {activePart !== partNumber
                ? `${countAnsweredQuestions(partNumber)} of 10 questions`
                : null}
            </div>
            {activePart === partNumber && (
              <div className="question-palette__items-group">
                {[...Array(10).keys()].map((i) => (
                  <span
                    key={i}
                    className={`question-palette__item ${answers[partNumber * 10 - 9 + i] !== undefined ? 'answered' : ''}`}
                  >
                    {partNumber * 10 - 9 + i}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReadTestPage;
