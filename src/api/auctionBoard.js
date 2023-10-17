import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const getCategories = async () => {
    return await instance.get("public/category");
 }

 

 export const getItem = async (page, category) => {
    let url = `public/auction?page=${page}`;
    if (category !== null) {
      url += `&category=${category}`;
    }
    return await instance.get(url);
  };
  
