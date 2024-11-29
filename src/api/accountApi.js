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

    create(email, password, roleID=2){
        const url= '/Account';
        const body={email, password, roleID};
        return axiosClient.post(url,body);

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