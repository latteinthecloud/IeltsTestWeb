import axiosClient from "./axiosClient";

const statisticApi={
    getCompletedTest(id, timeFrame){
        const url = "/statistic/user/"+ id +"?time=" +timeFrame ;
        return axiosClient.get(url);
    },
    getAvgScore(id,timeFrame){
        const url = "/statistic/score/"+ id +"?time=" +timeFrame ;
        return axiosClient.get(url);
    },
    getTimeSpent(id,timeFrame){
        const url = "/statistic/time/"+ id +"?time=" +timeFrame ;
        return axiosClient.get(url);
    },
    getBandMap(id,timeFrame){
        const url = "/statistic/band/"+ id +"?time=" +timeFrame ;
        return axiosClient.get(url);
    },
    getUser(){
        const url = "/statistic/user";
        return axiosClient.get(url);
    },
    getTest(){
        const url = "/statistic/test";
        return axiosClient.get(url);
    },
    getTaken(timeFrame){
        const url = "/statistic/attend/" + timeFrame ;
        return axiosClient.get(url);
    }
};

export default statisticApi;