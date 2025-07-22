import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Business_Api_Url = "https://gitlub.pythonanywhere.com/expert/allexpertprofilesviews/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MDg1NjQzLCJpYXQiOjE3MDM0OTM2NDMsImp0aSI6IjRlNzYwOWJjODIzNzQ1YTQ4YjBkZDczYzcxNmYwZTA1IiwidXNlcl9pZCI6Njd9.Dvn2tyts8TTvUaTlso-6_Cb4DbYZJSs8nCqPZIP6JC8";


interface ReferBusinessGetSlice {
 getBusinessData: []; 
}

// Get
export const fetchBusinessData = createAsyncThunk("fetchBusinessData", async () => {
    try {
      const res = await axios.get(Business_Api_Url , {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });
      console.log("Fetched business Data", res.data);
      return res.data;
    } catch (error) {
      console.error("GET Business request failed:", error);
      throw error;
    }
  });

  const ReferBusinessGetSlice = createSlice({
    name: "referBusiness",
    initialState: {
     getBusinessData:[],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBusinessData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBusinessData.fulfilled, (state, action) => {
            state.loading = false;
            state.getBusinessData = action.payload;
            console.log('Business ArrayData:', action.payload);
          })
          .addCase(fetchBusinessData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch business data";
            console.error("Business GET request failed:", action.error);
          });
    },
  });
  
  export default ReferBusinessGetSlice.reducer; 