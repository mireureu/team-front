import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 로그인
export const login = async (data) => {
  return await instance.post("/public/signin", data);
};

// token에 해당하는 사용자 불러오기 API
export const userInfo = async(token) =>{  
  return await instance.get("/user/show",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// 사용자 정보 업데이트 API
export const updateUser = async (data) => {
  const token = localStorage.getItem("token");    
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

// 비밀번호 맞는지 확인 API
export const passwordCheck = async (password) => {
  const token = localStorage.getItem("token");
  console.log(password);
  return await instance.post("/user/pwdCheck", password, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


// 회원가입
export const addUser = async (data) => {
  return await instance.post("/public/create", data);
};

// 아이디 중복 확인
export const idDuplicate = async (data) => {
  return await instance.post("/public/idDuplicate", data);
}
// 닉네임 중복 확인
export const nickDuplicate = async (data) =>{
  return await instance.post("/public/nickDuplicate",data);
}

// 비밀번호 잃어버렸을때 임시 비밀번호로 업데이트
export const updatePassword = async (data) => {
  return await instance.put("/public/updatePassword", data);
}

// 사용자가 비밀번호 변경
export const changePassowrd = async (password) =>{
  const token = localStorage.getItem("token");
  return await instance.put("/user/pwdUpdate",password,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}



