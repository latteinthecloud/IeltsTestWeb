import axiosClient from "./axiosClient";

const sectionApi = {
  // Tạo một bài kiểm tra mới
  createRead(testData) {
    const url = "/Section/Reading"; // URL cho việc tạo bài kiểm tra mới

    // Kiểm tra xem testData có đầy đủ các trường bắt buộc chưa
    if (!testData.testId || !testData.title || !testData.content) {
      throw new Error("Thiếu thông tin bắt buộc");
    }

    // Gửi POST request để tạo bài kiểm tra mới
    return axiosClient.post(url, {
      testId: testData.testId,
      title: testData.title,
      content: testData.content,
    });
  },

  createLis(testData) {
    const url = "/Section/Listening"; // URL cho việc tạo bài kiểm tra nghe mới

    // Kiểm tra xem testData có đầy đủ các trường bắt buộc chưa
    if (
      testData.sectionOrder ||
      !testData.timeStamp ||
      !testData.transcript ||
      testData.soundId
    ) {
      throw new Error("Thiếu thông tin bắt buộc");
    }

    // Gửi POST request để tạo bài kiểm tra nghe mới
    return axiosClient.post(url, {
      sectionOrder: testData.sectionOrder,
      timeStamp: testData.timeStamp,
      transcript: testData.transcript,
      soundId: testData.soundId,
    });
  },
};

export default sectionApi;
