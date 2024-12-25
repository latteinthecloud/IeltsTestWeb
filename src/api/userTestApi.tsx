import axiosClient from "./axiosClient";

const userTestApi ={
    getAll(accountId: number){
        const url = "/UserTest/"+ accountId;
        return axiosClient.get(url);
    },
    getById(testId: number){
        const url = "/UserTest/Info/"+testId;
        return axiosClient.get(url);
    },
    getFullReading(testId){
        const url = "/UserTest/Reading/"+ testId;
        return axiosClient.get(url);
    },
    getFullListening(testId){
        const url = "/UserTest/Listening/"+ testId;
        return axiosClient.get(url);
    },
    updateName(id, name){
        const url = "/UserTest/" + id + "?name=" + name;
        return axiosClient.patch(url);
    },
    create(body){
        const url = "/UserTest";
        return axiosClient.post(url, body);
    },
    createReading(body){
        const url = "/UserTest/Reading";
        return axiosClient.post(url, body);
    },
    createListening(body){
        const url = "/UserTest/Listening";
        return axiosClient.post(url, body);
    },
    delete(id){
        const url = "/UserTest/"+ id;
        return axiosClient.delete(url);
    },
    getSections(id){
        const url = "/UserTest/all/"+id;
        return axiosClient.get(url);
    }
}

export default userTestApi;