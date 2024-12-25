import axiosClient from "./axiosClient";

const statisticApi={
    getCompletedTest(id, timeFrame){
        const url = "/Statistic/User/"+ id +"?time=" +timeFrame ;
        return axiosClient.get(url);
    },
    getAvgScore(id,timeFrame){
        const url = "/Statistic/Score/"+ id +"?time=" +timeFrame ;
        return axiosClient.get(url);
    },
    getTimeSpent(id,timeFrame){
        const url = "/Statistic/Time/"+ id +"?time=" +timeFrame ;
        return axiosClient.get(url);
    },
    getBandMap(id,timeFrame){
        const url = "/Statistic/Band/"+ id +"?time=" +timeFrame ;
        return axiosClient.get(url);
    }
};

export default statisticApi;