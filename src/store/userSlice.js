import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/user";

const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
    const result = await login(data);
    return result.data;
});

const userSlice = createSlice({
    name:"loginSlice",
    initialState: {},
    reducers: {
        userSave: (state, action)=>{
            return action.payload;
        },
        userLogout: (state, action)=>{
            return {};
        },
    },

    extraReducers: (builder) => {
        builder.addCase(asyncLogin.fulfilled, (state, action)=>{
            localStorage.setItem("token",action.payload.token);  
            // 서버측에서 token변수명을 String token이라고 선언했기때문에
            // action.payload.token이라고 해야함
            
            localStorage.setItem("user",JSON.stringify(action.payload)); // 유저의 정보를 json 방식으로 저장
            return action.payload;
        });
    }
});

export default userSlice;
export {asyncLogin};
export const {userSave, userLogout} = userSlice.actions;


//  데이터 저장
// localStorage.setItem("myKey", "This is a value");

//  데이터 검색
// const myValue = localStorage.getItem("myKey");
// console.log(myValue);  // "This is a value"