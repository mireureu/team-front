import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getAuctionBoard = async () => {
  return null;
};

export const getHotList = async () => {
  return await instance.get("public/auction/hot");
};

export const getCategories = async () => {
  return await instance.get("public/category");
};

export const getItem = async (page, category, sortOption) => {
  let url = `public/auction?page=${page}`;
  if (category !== null) {
    url += `&category=${category}`;
  }
  if (sortOption !== null) {
    url += `&sortOption=${sortOption}`;
  }
  return await instance.get(url);
};