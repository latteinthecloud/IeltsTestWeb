import axiosClient from "./axiosClient";

const resultApi={
    create(accountId, testId, testAccess, completeTime){
        const url="/Result";
        const body={
            accountId: parseInt(accountId, 10), 
            testId: parseInt(testId, 10),
            testAccess, 
            completeTime
        };
        return axiosClient.post(url,body);
    },

    createDetails(resultId: number, answers: Map<number, string>, questionIds: number[]) {
        const url = "/Result/Full";
    
        const userAnswers = Object.fromEntries(answers);
    
        const body = {
            resultId,
            userAnswers,
            questionIds,
        };
    
        return axiosClient.post(url, body);
    }
    
}

export default resultApi;