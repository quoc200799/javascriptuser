import axios from "axios";
const API_PATH_PROVINCE = "https://provinces.open-api.vn/api/p/";


export const getLogin = (data) => {
    return axios.get("http://localhost:8080/api/login", data)
};
