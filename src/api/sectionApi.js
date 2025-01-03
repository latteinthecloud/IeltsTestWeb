import axiosClient from "./axiosClient";

const sectionApi={
     // Tạo một bài kiểm tra mới
     createRead(testData) {
        const url = '/section/reading';  // URL cho việc tạo bài kiểm tra mới
        
        // Kiểm tra xem testData có đầy đủ các trường bắt buộc chưa
        if (!testData.testId || !testData.title || !testData.content ) {
          throw new Error('Thiếu thông tin bắt buộc');
        }
        
        // Gửi POST request để tạo bài kiểm tra mới
        return axiosClient.post(url, {
          testId: testData.testId,
          title: testData.title,
          content: testData.content,
        });
      },


      
    createLis(testData) {
      const url = '/section/listening';  // URL cho việc tạo bài kiểm tra nghe mới
      
      // Kiểm tra xem testData có đầy đủ các trường bắt buộc chưa
      if (
        testData.sectionOrder || 
        !testData.timeStamp || 
        !testData.transcript || 
        testData.soundId
      ) {
        throw new Error('Thiếu thông tin bắt buộc');
      }
  
      // Gửi POST request để tạo bài kiểm tra nghe mới
      return axiosClient.post(url, {
        sectionOrder: testData.sectionOrder,
        timeStamp: testData.timeStamp,
        transcript: testData.transcript,
        soundId: testData.soundId,
      });
    },

   // API để thêm âm thanh (add sound)
  addSound(fileData) {
    const url = '/sound';  // URL cho việc thêm âm thanh

    // Kiểm tra xem tệp có được chọn không
    if (!fileData || !fileData.file) {
      throw new Error('Vui lòng chọn tệp âm thanh');
    }

    // Tạo đối tượng FormData để gửi yêu cầu multipart/form-data
    const formData = new FormData();
    formData.append('soundFile', fileData.file);  // 'soundFile' là tên trường trong API backend

    // Nếu có các thông tin khác đi kèm với âm thanh, thêm vào formData
    if (fileData.testId) {
      formData.append('testId', fileData.testId);
    }
    // Gửi yêu cầu POST với FormData để upload tệp âm thanh
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Đảm bảo gửi dữ liệu dạng multipart/form-data
      },
    });
  },

  getAll(id){
    const url = "/section/" + id;
    return axiosClient.get(url);
  },

  getChoiceList(id){
    const url = "/questionlist/choice/" + id;
    return axiosClient.get(url);
  },

  getImg(id){
    const url = "/questionlist/image/" + id;
    return axiosClient.get(url);
  },

  getReadingFull(id){
    const url = "/section/details/reading/"+id;
    return axiosClient.get(url);
  },

  getListeningFull(soundId){
    const url = "/section/details/listening/"+soundId;
    return axiosClient.get(url);
  },

  getSound(id){
    const url = "/sound/"+id;
    return axiosClient.get(url);
  }
};

export default sectionApi;