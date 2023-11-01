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
  return await instance.get("/user/show",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (data) => {
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(data);
  try {
    return await instance.put("/user/updateuser", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('API 에러 발생:', error);
    throw error;
  }
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


export const passwordCheck = async (password) => {
  const token = localStorage.getItem("token");
  console.log(password);
  return await instance.post("/user/pwdCheck", password, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const addUser = async (id) => {
  try {
    // 사용자 정보 가져오기
    const token = localStorage.getItem("token");

    // 사용자 정보를 요청에 포함하여 백엔드에 GET 요청 보내기
    const response = await instance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // 백엔드에서 반환한 JSON 데이터를 반환
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
    throw error;
  }
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

export const updatePassword = async (data) => {
  return await instance.put("/public/updatePassword", data);
}

export const changePassowrd = async (password) =>{
  const token = localStorage.getItem("token");
  return await instance.put("/user/pwdUpdate",password,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}




export default getUserInfo;
