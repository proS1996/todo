import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/rtk-query/authApi';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
