import axios from "axios";
const token = localStorage.getItem("token");
// http://localhost:8080/api/
const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getCategories = async () => {
  return await instance.get("/public/category");
};

export const addPost = async (data) => {
  return await instance.post("/user/post", data);
};

export const getPost = async (auctionNo) => {
  return await instance.get(`/public/auction/${auctionNo}`);
};
