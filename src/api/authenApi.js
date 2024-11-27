import axiosClient from "./axiosClient";

const authenApi={
    login(email, password){
        const url='/Authentication/Login';
        return axiosClient.post(url, email,password)
    }

};
export default authenApi;