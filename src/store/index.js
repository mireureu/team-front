import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        
    }

})