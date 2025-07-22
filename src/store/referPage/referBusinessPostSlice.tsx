import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Business_API_URL = "https://gitlub.pythonanywhere.com/referrals/Businessrefer/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MDg1NjQzLCJpYXQiOjE3MDM0OTM2NDMsImp0aSI6IjRlNzYwOWJjODIzNzQ1YTQ4YjBkZDczYzcxNmYwZTA1IiwidXNlcl9pZCI6Njd9.Dvn2tyts8TTvUaTlso-6_Cb4DbYZJSs8nCqPZIP6JC8";

interface ReferBusinessPostSlice {           
  businessData:[];
  loading: boolean;
  error: string | null;
}  
  // Post
  export const postBusinessData = createAsyncThunk(
    "referBusiness/postBusinessData",
    async (data: FormData) => {
      try {
        const response = await axios.post(Business_API_URL, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        });
        console.log("Business Response", response.data);
        return response.data;
      } catch (error) {
        console.log("Business POST request failed:", error);
        throw error;
      }
    }
  );
  
  const ReferBusinessPostSlice = createSlice({
    name: "referBusiness",
    initialState: {
      businessData: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(postBusinessData.pending, (state) => {
          state.loading = true;
        })
        .addCase(postBusinessData.fulfilled, (state, action) => {
          state.loading = false;
          state.loading = false;
          state.businessData = action.payload.businessData;
          console.log("Business Response Data:", action.payload);
        })
        .addCase(postBusinessData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to post data";
          console.error("Business POST request failed:", action.error);
        });
    },
  });
  
  export default ReferBusinessPostSlice.reducer;  