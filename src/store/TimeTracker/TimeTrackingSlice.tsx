import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import axios from "axios";
import { TIMETRACKERAPI } from "../../api/TimeTracker";
import { valuesType } from "../../pages/TimeTracker.tsx/TimeTracker";
import { token } from "../../utils/constants";

  // Fetching data of engagements By RTK Query ===========> 
export const getEngagementsApi = createApi({
  baseQuery : fetchBaseQuery({
    baseUrl : 'https://gitlub.pythonanywhere.com/admin_user/',
    prepareHeaders: (headers, { getState }) => {
      // Add the authorization token to the headers
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes : ['engagements'],
  endpoints : (builder) => ({
    getEngagement : builder.query<any , void>({
      query : () => 'activeengagementsapi/',
      providesTags : ['engagements']
    }),
  })
})

  // Data Fetching of LogHours By createAsyncThunk ====> 

                // Get data of logHours 
export const LogHoursData = createAsyncThunk("LogHoursData", async () => {
  try {
    const response = await axios.get(TIMETRACKERAPI, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
        // Post Data of LogHours By using TimeTracker

export const addTime = createAsyncThunk(
  "addTimeData",
  async (data : valuesType, { rejectWithValue }) => { 
    try {
      const response = await axios.post(TIMETRACKERAPI, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

    // Its TimeTracker Slice ----> 

const TimeTrackerSlice = createSlice({
  name: "Time Tracker Slice",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(LogHoursData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LogHoursData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log(state.data);
      })
      .addCase(LogHoursData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTime.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  reducers: {},
});

export default TimeTrackerSlice.reducer;
export const {useGetEngagementQuery} = getEngagementsApi
