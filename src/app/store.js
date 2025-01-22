import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/rtk-query/authApi';
import authReducer from '../features/auth/authSlice';
import { todoApi } from '../services/rtk-query/todoApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,todoApi.middleware),
});

export default store;
