import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:8080/api",
});

export const getCategories = async () => {
    return await instance.get("/public/category"); // main_category 테이블, intellij로 구현
}
export const duplicate = async (data) => {
    return await instance.post("/user/duplicate", data);
}
export const addUser = async (data) => {
    return await instance.post("/user/create", data);
};

