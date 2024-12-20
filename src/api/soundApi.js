import axiosClient from "./axiosClient";

const soundApi = {
  // API để thêm âm thanh (add sound)
  addSound(file, testId) {
    const url = `/Sound/${testId}`; // URL cho việc thêm âm thanh, có testId trong đường dẫn

    // Kiểm tra dữ liệu đầu vào
    if (!file) {
      throw new Error("Vui lòng chọn tệp âm thanh trước khi upload.");
    }

    // Tạo FormData để gửi dữ liệu
    const formData = new FormData();
    formData.append("file", file); // 'file' là tên trường theo API yêu cầu

    // Thực hiện yêu cầu POST
    return axiosClient
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Gửi dữ liệu dạng multipart/form-data
        },
      })
      .then((response) => {
        // Xử lý phản hồi thành công
        return response.data;
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Lỗi khi upload âm thanh:", error);
        throw new Error(
          error.response?.data?.message || "Đã xảy ra lỗi khi upload âm thanh."
        );
      });
  },
};

export default soundApi;
