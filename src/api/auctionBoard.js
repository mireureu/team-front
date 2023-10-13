import axios from "axios";

// http://localhost:8080/api/
const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const getAuctionBoard = async () => {
    return null;
};

export const getHotList = async () => {
    return await instance.get("public/auction/hot");
};