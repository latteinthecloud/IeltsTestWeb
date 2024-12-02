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

};
export default testApi;