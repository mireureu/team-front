import axios from "axios";
const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const login = async (data) => {
  return await instance.post("/public/signin", data);
};

export const userInfo = async() =>{
  return await instance.get("/user")
}


const getUserInfo = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  let userObject = null;

  if (storedToken && storedUser) {
    userObject = JSON.parse(storedUser);
  }

  return { storedToken, userObject };
};

export default getUserInfo;
