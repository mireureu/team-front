
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchResult } from "../api/search";

const asyncSearch = createAsyncThunk("searchSlice/asyncSearch", async(keyword) =>{   
    // const key = keyword.get("keyword");
    // console.log("searchSlice에 넘어온값:: " + key);

    const result = await getSearchResult(keyword);
            
    console.log(result.data);
    return result.data;
});

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: [],
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(asyncSearch.fulfilled, (state, action) =>{            
            console.log(action.payload);        
            return action.payload;
        });
        builder.addCase(asyncSearch.rejected , (state, action)=>{
            alert("검색 결과가 없습니다. ", action.error);
       });
    },
});
export default searchSlice;
export { asyncSearch }; 