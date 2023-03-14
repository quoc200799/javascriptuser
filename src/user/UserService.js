import axios from "axios";
const API_PATH_PROVINCE = "https://provinces.open-api.vn/api/p/";


export const searchByPage = () => {
    return axios.get("http://localhost:8080/api/users")
};

export const getUserById = (id) => {
    return axios.get(`http://localhost:8080/api/users/${id}`)
};

export const deleteItem = (id) => {
    return axios.delete(`http://localhost:8080/api/users/${id}`)
};

export const getProvinces = () => {
    return axios.get(API_PATH_PROVINCE)
}
//// POST 
export const addUser = (employee) => {
    var url = "http://localhost:8080/api/users";
    return axios.post(url, employee);
};

export const forgotPass = (id) => {
    var url = `http://localhost:8080/api/users/${id}/forgot-password`;
    return axios.post(url, id);
};

export const updatePass = (data) => {
    var url = `http://localhost:8080/api/users/${data.id}/update-password`;
    return axios.put(url, data);
};

export const updateUser = (data) => {
    var url = `http://localhost:8080/api/users/${data.id}`;
    return axios.put(url, data);
};

export const updateAvatar = (data) => {
    var url = `http://localhost:8080/api/users/${data.id}/update-avatar`;
    return axios.put(url, data);
};