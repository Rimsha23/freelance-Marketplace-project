import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Api_Url = "https://gitlub.pythonanywhere.com/expert/allexpertprofilesviews/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MDg1NjQzLCJpYXQiOjE3MDM0OTM2NDMsImp0aSI6IjRlNzYwOWJjODIzNzQ1YTQ4YjBkZDczYzcxNmYwZTA1IiwidXNlcl9pZCI6Njd9.Dvn2tyts8TTvUaTlso-6_Cb4DbYZJSs8nCqPZIP6JC8";


interface referGetSlice {
  getData: []; 
}

// Get
export const fetchExpertData = createAsyncThunk("fetchExpertData", async () => {
    try {
      const res = await axios.get(Api_Url , {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });
      console.log("Fetched Data", res.data);
      return res.data;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  });

  const referGetSlice = createSlice({
    name: "refer",
    initialState: {
      getData:[],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchExpertData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchExpertData.fulfilled, (state, action) => {
            state.loading = false;
            state.getData = action.payload;
            console.log('ArrayData:', action.payload);
          })
        .addCase(fetchExpertData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          console.log(action.error.message);
        })
    },
  });
  
  export default referGetSlice.reducer; 