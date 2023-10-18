import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:8080/api",
});
export const getSearchResult = async (keyword) =>{
    return await instance.post("public/search",keyword);    
} 