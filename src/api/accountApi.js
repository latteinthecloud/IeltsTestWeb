import axiosClient from "./axiosClient";

const accountApi ={
    getAll(){
        const url='/account';
        return axiosClient.get(url)
    },
    get(id){
        const url= `/account/${id}`;
        return axiosClient.get(url)

    },

    create(email, password, roleID=2){
        const url= '/account';
        const body={email, password, roleID};
        return axiosClient.post(url,body);

    },
    update(id,data){
        const url= `/account/${id}`;
        return axiosClient.patch(url, data)

    },

    deactive(id){
        const url= `/account/deactivate/${id}`;
        return axiosClient.patch(url)

    },
    
    updateImage(id, file){
        const url = `/account/image/${id}`;
        const formData= new FormData();
        formData.append("file", file) // gan file vào form data,

        return axiosClient.post(url, formData, {
            headers:{
                "Content-Type": "multipart/form-data",
            },
        });

    },
    getAvatar(id){
        const url = "/account/image/"+id;
        return axiosClient.get(url);
    }

};

export default accountApi;