import axiosClient from "./axiosClient";
const testApi={
  getAll() {
    const url='/Test';
    return axiosClient.get(url)
  },

  find(name) {
    const url = '/Test/Match';  // Keep the URL as it is
    return axiosClient.get(url, {
      params: { name }  // Pass the name as a query parameter
    });
  },
  create(testData) {
    const url = '/Test';  // URL cho việc tạo bài kiểm tra mới
    
    // Kiểm tra xem testData có đầy đủ các trường bắt buộc chưa
    if (!testData.testType || !testData.testSkill || !testData.name || !testData.monthEdition || !testData.yearEdition) {
      const missingFields = [];
      if (!testData.testType) missingFields.push('testType');
      if (!testData.testSkill) missingFields.push('testSkill');
      if (!testData.name) missingFields.push('name');
      if (!testData.monthEdition) missingFields.push('monthEdition');
      if (!testData.yearEdition) missingFields.push('yearEdition');
      
      throw new Error(`Thiếu thông tin bắt buộc: ${missingFields.join(', ')}`);
    }
  
    // Gửi POST request để tạo bài kiểm tra mới
    return axiosClient.post(url, {
      testType: testData.testType,
      testSkill: testData.testSkill,
      name: testData.name,
      monthEdition: testData.monthEdition,
      yearEdition: testData.yearEdition
    });
  }
  
};

export default testApi;