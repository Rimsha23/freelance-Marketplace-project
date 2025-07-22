import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://gitlub.pythonanywhere.com/referrals/referanexpert/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MDg1NjQzLCJpYXQiOjE3MDM0OTM2NDMsImp0aSI6IjRlNzYwOWJjODIzNzQ1YTQ4YjBkZDczYzcxNmYwZTA1IiwidXNlcl9pZCI6Njd9.Dvn2tyts8TTvUaTlso-6_Cb4DbYZJSs8nCqPZIP6JC8";

interface ReferPostSlice {           
  data:[];
  loading: boolean;
  error: string | null;
}  
  // Post
  export const postExpertData = createAsyncThunk(
    "refer/postExpertData",
    async (data: FormData) => {
      try {
        const response = await axios.post(API_URL, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        });
        console.log("Response", response.data);
        return response.data;
      } catch (error) {
        console.log("POST request failed:", error);
        throw error;
      }
    }
  );
  
  const ReferPostSlice = createSlice({
    name: "refer",
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(postExpertData.pending, (state) => {
          state.loading = true;
        })
        .addCase(postExpertData.fulfilled, (state, action) => {
          state.loading = false;
          state.loading = false;
          state.data = action.payload.data;
          console.log("Response Data:", action.payload);
        })
        .addCase(postExpertData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to post data";
          console.error("POST request failed:", action.error);
        });
    },
  });
  
  export default ReferPostSlice.reducer;  