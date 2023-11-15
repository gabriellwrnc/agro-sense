import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./slices";

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
    }
})

export default store;