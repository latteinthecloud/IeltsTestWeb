import axiosClient from "./axiosClient";

const accountApi ={
    getAll(){
        const url='/Account';
        return axiosClient.get(url)
    },
    get(id){
        const url= `/Account/${id}`;
        return axiosClient.get(url)

    },

    create(data){
        const url= '/Account';
        return axiosClient.post(url,data)

    },
    update(id,data){
        const url= `/Account/${id}`;
        return axiosClient.patch(url, data)

    },

    deactive(id){
        const url= `/Account/Deactivate/${id}`;
        return axiosClient.patch(url)

    },
};
export default accountApi;