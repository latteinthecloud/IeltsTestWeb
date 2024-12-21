import axiosClient from "./axiosClient";

const questionApi={
  create(data) {
    const url = '/Question';  // URL cho việc tạo bài kiểm tra mới
    
    // Kiểm tra xem data có đầy đủ các trường bắt buộc chưa
    if (!data.qlistId || !data.content || !data.answer) {
        throw new Error('Thiếu thông tin bắt buộc');
    }
    
    // Kiểm tra xem choiceList có phải là một mảng hợp lệ
    if (!Array.isArray(data.choiceList) || data.choiceList.length === 0) {
        throw new Error('Thiếu hoặc không hợp lệ choiceList');
    }

    // Gửi POST request để tạo bài kiểm tra mới
    return axiosClient.post(url, {
        qlistId: data.qlistId,
        content: data.content,
        answer: data.answer,
        choiceList: data.choiceList  // Thêm choiceList vào request
    });
}


}
export default questionApi;