import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { expert_feedback_api, expert_token } from "../../utils/api-urls";

interface FeedbackData {
  user: number
  subject: string;
  message : string;
}
const header = {
  Authorization: `Bearer ${expert_token}`,
  "Content-Type": "application/json",
};
export const feedbackApi = createAsyncThunk(
  "feedbackApi",
  async (formData: FeedbackData) => {
    try {
      const response = await axios.post(
        expert_feedback_api,
        formData,
        { headers: header }
      );

      console.log("response", response.data);
    } catch (error) {
      console.error("feedback failed", error);
      throw new Error("failed.... Please try again.");
    }
  }
);
const feedbackSlice = createSlice({
  name: "feedbackApi",
  initialState: {
    user: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feedbackApi.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(feedbackApi.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload !== undefined ? action.payload : null;
        state.error = null;
      })
      .addCase(feedbackApi.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error =
          action.error.message !== undefined ? action.error.message : null;
      });
  },
});

export default feedbackSlice.reducer;