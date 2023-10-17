import axios from "axios";

// http://localhost:8080/api/
const instance = axios.create({
  baseURL: "http://localhost:8080/api/user/post",
});

export const getAuctionBoard = async () => {
  return null;
};
