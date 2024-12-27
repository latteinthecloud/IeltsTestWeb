import axiosClient from "./axiosClient";

const userTestApi ={
    getAll(accountId: number){
        const url = "/usertest/"+ accountId;
        return axiosClient.get(url);
    },
    getById(testId: number){
        const url = "/usertest/info/"+testId;
        return axiosClient.get(url);
    },
    getFullReading(testId){
        const url = "/usertest/reading/"+ testId;
        return axiosClient.get(url);
    },
    getFullListening(testId){
        const url = "/usertest/listening/"+ testId;
        return axiosClient.get(url);
    },
    updateName(id, name){
        const url = "/usertest/" + id + "?name=" + name;
        return axiosClient.patch(url);
    },
    create(body){
        const url = "/usertest";
        return axiosClient.post(url, body);
    },
    createReading(body){
        const url = "/usertest/reading";
        return axiosClient.post(url, body);
    },
    createListening(body){
        const url = "/usertest/listening";
        return axiosClient.post(url, body);
    },
    delete(id){
        const url = "/usertest/"+ id;
        return axiosClient.delete(url);
    },
    getSections(id){
        const url = "/usertest/all/"+id;
        return axiosClient.get(url);
    }
}

export default userTestApi;