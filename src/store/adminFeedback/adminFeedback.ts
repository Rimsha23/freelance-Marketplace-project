import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import { ADMIN_FEEDBACK, baseUrl } from "../../api/base-api";

export interface Feedback {
  id: number;
  message: string;
  subject: string;
  user: number;
  user_email: string;
  user_full_name: string;
  user_image: null | string;
}

export interface FeedbackState {
  feedback: Feedback[];
  error: string | null;
}

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQ1NTk3LCJpYXQiOjE3MDM3NTM1OTcsImp0aSI6ImU1MTM2YTNkMzFhZjQ4OGZhNmEzNGMyYmYxZWNlMjUwIiwidXNlcl9pZCI6NTQzMDV9.WtDarFhaMHNhuS1Ry6djT_FQnU0pvh9TUI-3EgwG9pA";
const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
};

export const fetchFeedbackData = createAsyncThunk("FeedbackData", async () => {
  try {
    const res = await axios.get(
      `${baseUrl}${ADMIN_FEEDBACK}`,
      { headers }
    );
    console.log(res.data);
    return res.data as Feedback[];
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const feedbackDataSlice = createSlice({
  name: "FetchExpertData",
  initialState: {
    feedback: [],
    error: null,
  } as FeedbackState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbackData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        fetchFeedbackData.fulfilled,
        (state, action: PayloadAction<Feedback[]>) => {
          state.feedback = action.payload;
        }
      )
      .addCase(fetchFeedbackData.rejected, (state, action) => {
        state.error = action.error.message as string;
      });
  },
});

export default feedbackDataSlice.reducer;
