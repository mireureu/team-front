import axios from "axios";
// const token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const login = async (data) => {
  return await instance.post("/public/signin", data);
};

export const pwdChack = async (data) => {

  if(data != null) {

  }
  return await instance.post("/user/pwdUp", data);
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
    return await instance.put("/user/updateuser", data, {headers: {
      Authorization: `Bearer ${token}`,
  },});
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
};


// interest 가져오기
export const getInterest = async () => {
  return await instance.get(`/interest`);
}

// 게시글 관심 등록
export const addMyInterest = async (num) => {

  try {
    const token = localStorage.getItem("token");

    const requestData = {
      auctionNo: num,
    };

    const response = await instance.post(`/user/addList`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
    throw error;
  }
};

// 관심 등록한 게시글 List 가져오기
export const getMyInterestList = async () => {

  try {
    const token = localStorage.getItem("token");

    const response = await instance.get(`/user/myInterestList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
    throw error;
  }

};

// 관심 등록한 게시글 삭제
export const deleteCheck = async (auctionNo) => {

  console.log(auctionNo);
  try {
    const token = localStorage.getItem("token");

    const response = await instance.delete(`/user/checkDelete`, auctionNo, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
    throw error;
  }
};

// 관심 등록한 게시글 List 삭제
export const deleteCheckList = async (auctionNos) => {
  const formData = new FormData();
  formData.append("list", auctionNos);

  console.log(auctionNos);
  try {
    const token = localStorage.getItem("token");

    const response = await instance.delete(`/user/checkDeleteList`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {"list" : auctionNos}, // 선택된 auctionNo 값을 전달
    });
    console.log(response);
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
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

export const updatePassword = async (data) => {
  return await instance.put("/public/updatePassword",data);
}

export default getUserInfo;
