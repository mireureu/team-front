import axios from "axios";
// const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const login = async (data) => {
  return await instance.post("/public/signin", data);
};

export const userInfo = async(token) =>{
  console.log(token);
  return await instance.get("/user",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const addUser = async (data) => {
  return await instance.get("/user/{id}", data)
}

export const updateUser = async (data) => {
  return await instance.post("/user/updateuser", data);
};

export const getUserData = async (id) => {
  try {
    const response = await instance.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data: " + error);
    throw error;
  }
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
