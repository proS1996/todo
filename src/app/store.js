import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { todoApi } from "../services/rtk-query/todoApi";
import { authApi } from "../services/rtk-query/authApi";

const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,

    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware, authApi.middleware)
});

export default store;
