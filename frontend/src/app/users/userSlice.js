import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: {},
}

export const fetchUserData =  createAsyncThunk("user/fetchUserData", async (userId) => {
        const response = await axios.get(`http://localhost:7070/getUserById/${userId}`).catch((err) => err);
        return response.data;
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchUserData.pending] : () => {
        console.log("Pending....");
    },
    [fetchUserData.fulfilled]: (state, action) => {
        return {...state, user: action.payload};
    },
    [fetchUserData.rejected] : () => {
        console.log("Rejected...");
    }
  }
});

export const {} = userSlice.actions

export default userSlice.reducer