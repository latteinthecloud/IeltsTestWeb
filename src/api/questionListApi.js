import axiosClient from "./axiosClient";
const questionListapi={
    create(data){
        return axiosClient.post('/questionlist', data); // Gửi POST request tới endpoint '/question-list' với dữ liệu `data`
    },

}
export default questionListapi;