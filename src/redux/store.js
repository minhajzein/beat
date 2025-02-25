import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../apis/apiSlice";
import authReducer from './slices/authSlice'



export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => {
        const allMiddleware = [
            apiSlice.middleware,
        ];
        return getDefaultMiddleware({ serializableCheck: false }).concat(
            ...allMiddleware
        );
    },
    devTools: true
})

export default store