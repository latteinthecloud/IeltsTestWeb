import axiosClient from "./axiosClient";

const authenApi={
    login(email, password){
        const url='/auth/login';
        const body={email, password}
        return axiosClient.post(url, body)
    },
    code(email){
        const url='/auth/code';
        return axiosClient.post(url, email)
    },

    password(email, newPassword) {
        const url = '/auth/password'; // Reset password endpoint
        const body = {
            email,           // User's email
            password: newPassword // New password to set
        };
        return axiosClient.post(url, body);
    },

    verificationApi(email, verificationCode){
        const url='/auth/verify';
        const body={email, verificationCode}
        return axiosClient.post(url, body)
    }
};
export default authenApi;