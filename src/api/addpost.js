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
  return await instance.get(`/user/auction/${auctionNo}`);
};

export const updateCurrentPrice = async (auctionNo, currentPrice) => {
  console.log(currentPrice);
  console.log(auctionNo);
  return await instance.put(`/user/auction/${auctionNo}`, currentPrice);
};

export const getCountAuction = async (memberId) => {
  return await instance.get(`/public/auction/count?memberId=${memberId}`);
};
