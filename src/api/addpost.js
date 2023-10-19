import axios from "axios";

// http://localhost:8080/api/
const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getCategories = async () => {
  return await instance.get("/public/category");
};

export const addPost = async (data) => {
  return await instance.post("/public/post", data);
};

export const getPost = async (auctionNo) => {
  return await instance.get(`/public/auction/${auctionNo}`);
};
