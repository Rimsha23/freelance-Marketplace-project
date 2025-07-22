import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { REPLY_FEEDBACK } from "../../api/base-api";
import { baseUrl } from "../../api/base-api";
export interface ReplyFeedback {
  user_id: number | undefined;
  reply: string;
}

export interface ReplyFeedbackState {
  replyFeedback: ReplyFeedback[];
  error: string | null;
}

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQ1NTk3LCJpYXQiOjE3MDM3NTM1OTcsImp0aSI6ImU1MTM2YTNkMzFhZjQ4OGZhNmEzNGMyYmYxZWNlMjUwIiwidXNlcl9pZCI6NTQzMDV9.WtDarFhaMHNhuS1Ry6djT_FQnU0pvh9TUI-3EgwG9pA";

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
};
//Asunc thunk for fetching feedback reply data
export const fetchReplyData = createAsyncThunk("ReplyFeedbacck", async () => {
  try {
    const res = await axios.get(
      `${baseUrl}${REPLY_FEEDBACK}`,
      { headers }
    );
    console.log(res.data);
    return res.data as ReplyFeedback[];
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//Async thunk for posting Admin's reply to user on feedback

export const addNewReplyFeedback = createAsyncThunk(
  "AddNewReplyFeedback",
  async (newReplyFeedback: ReplyFeedback) => {
    try {
      const res = await axios.post(
        `${baseUrl}${REPLY_FEEDBACK}`,
        newReplyFeedback,
        {
          headers,
        }
      );
      console.log(res.data);
      return res.data as ReplyFeedback;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const ReplyFeedbackSlice = createSlice({
  name: "PostReplyFeedback",
  initialState: {
    replyFeedback: [],
    error: null,
  } as ReplyFeedbackState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReplyData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        fetchReplyData.fulfilled,
        (state, action: PayloadAction<ReplyFeedback[]>) => {
          state.replyFeedback = action.payload;
        }
      )
      .addCase(fetchReplyData.rejected, (state, action) => {
        state.error = action.error.message as string;
      });
  },
});

export default ReplyFeedbackSlice.reducer;
