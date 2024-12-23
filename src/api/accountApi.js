import axiosClient from "./axiosClient";

const accountApi = {
  getAll() {
    const url = "/Account";
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/Account/${id}`;
    return axiosClient.get(url);
  },

  create(email, password, roleID = 2) {
    const url = "/Account";
    const body = { email, password, roleID };
    return axiosClient.post(url, body);
  },
  update(id, data) {
    const url = `/Account/${id}`;
    return axiosClient.patch(url, data);
  },

  deactive(id) {
    const url = `/Account/Deactivate/${id}`;
    return axiosClient.patch(url);
  },

  updateImage(id, file) {
    const url = `/Account/Image/${id}`;
    const formData = new FormData();
    formData.append("file", file); // gan file vào form data,

    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  find(email) {
    const url = "/Account/Match"; // Đường dẫn API tìm kiếm
    return axiosClient.get(url, {
      params: { email }, // Truyền email làm tham số truy vấn
    });
  },
};

export default accountApi;
