import axiosClient from "./axiosClient";

const userTestApi ={
    getAll(accountId: number){
        const url = "/UserTest/"+ accountId;
        return axiosClient.get(url);
    }
}

export default userTestApi;