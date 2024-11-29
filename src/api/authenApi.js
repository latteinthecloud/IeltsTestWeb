import axiosClient from "./axiosClient";

const authenApi={
    login(email, password){
        const url='/Authentication/Login';
        const body={email, password}
        return axiosClient.post(url, body)
    },
    code(email){
        const url='/Authentication/Code';
        return axiosClient.post(url, email)
    },

    password(email, newPassword) {
        const url = '/Authentication/Password'; // Reset password endpoint
        const body = {
            email,           // User's email
            password: newPassword // New password to set
        };
        return axiosClient.post(url, body);
    },

    verificationApi(email, verificationCode){
        const url='/Authentication/Verify';
        const body={email, verificationCode}
        return axiosClient.post(url, body)
    }

};
export default authenApi;