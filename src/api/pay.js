import axios from "axios";
const token = localStorage.getItem("token");
const instance = axios.create({
    baseURL: "http://localhost:8080/api",  
});

export const updatePoint = async (data) =>{
    console.log(token);
    console.log(data);    
    return await instance.put("/user/point",data,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}