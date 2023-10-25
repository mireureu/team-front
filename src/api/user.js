import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/public", 
});

export const login = async (data) => {
  return await instance.post("/signin", data);
};

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
