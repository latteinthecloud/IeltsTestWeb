import axiosClient from "./axiosClient";
const testApi={
  getAll() {
    const url='/Test';
    return axiosClient.get(url)
  },

  find(name) {
    const url = '/Test/Match'; 
    return axiosClient.get(url, {
      params: { name }
    });
  },
  create(testData) {
    const url = '/Test'; 
    
    if (!testData.testType || !testData.testSkill || !testData.name || !testData.monthEdition || !testData.yearEdition) {
      const missingFields = [];
      if (!testData.testType) missingFields.push('testType');
      if (!testData.testSkill) missingFields.push('testSkill');
      if (!testData.name) missingFields.push('name');
      if (!testData.monthEdition) missingFields.push('monthEdition');
      if (!testData.yearEdition) missingFields.push('yearEdition');
      
      throw new Error(`Thiếu thông tin bắt buộc: ${missingFields.join(', ')}`);
    }
  
    return axiosClient.post(url, {
      testType: testData.testType,
      testSkill: testData.testSkill,
      name: testData.name,
      monthEdition: testData.monthEdition,
      yearEdition: testData.yearEdition
    });
  },

  getById(id){
    const url = "/Test/"+id;
    return axiosClient.get(url);
  }
  
};

export default testApi;