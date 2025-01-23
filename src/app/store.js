import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { todoApi } from '../services/rtk-query/todoApi';

const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export default store;
