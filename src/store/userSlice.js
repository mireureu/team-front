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
            localStorage.setItem("user",JSON.stringify(action.payload)); // 유저의 정보를 json 방식으로 저장      
            return action.payload;
        });
    }
});

export default userSlice;
export {asyncLogin};
export const {userSave, userLogout} = userSlice.actions;


// //  데이터 저장
// localStorage.setItem("myKey", "This is a value");

// //  데이터 검색
// const myValue = localStorage.getItem("user");
// console.log(myValue+"로그인");  // "This is a value"
