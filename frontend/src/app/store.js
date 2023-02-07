import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './users/userSlice';


export const store = configureStore({
  reducer: {
    user: userSlice
  }
});
