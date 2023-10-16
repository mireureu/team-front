import axios from "axios";

// http://localhost:8080/api/
const instance = axios.create({
  baseURL: "http://localhost:8080/api/user/post",
});

export const getCategories = async () => {
  return await instance.get("/public/category");
};

export const addPost = async (data) => {
  return await instance.post("/user/post", data);
};
