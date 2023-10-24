import axios from "axios";
import { async } from "q";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});


export const getAuctionBoard = async () => { 
    return null;
};


export const getHotList = async () => {
    return await instance.get("public/auction/hot");
};

export const getList = async () => {
  return await instance.get("public/auction/sortedt");
};

export const getNewList = async () => {
    return await instance.get("public/auction/new");
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
