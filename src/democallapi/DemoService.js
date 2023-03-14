import axios from "axios";

// export default getDate = () => {
//     const data = axios.get();
//     return data;

// }

export const  searchByPage = (searchObject , ls) => {
    return axios.get(`https://jsonplaceholder.typicode.com/${ls}`, searchObject)
};
