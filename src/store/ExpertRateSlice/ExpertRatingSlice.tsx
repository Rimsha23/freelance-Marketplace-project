import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { EXPERT_RATE_API } from "../../api/base-api";
export interface RateExpert {
  id: number;
  user: string;
  value: number;
  discription: string;
}

export interface RateExpertState {
  expertRate: RateExpert[];
  error: string | null;
}

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1MjEyODQ4LCJpYXQiOjE3MDI2MjA4NDgsImp0aSI6IjMyMTM4NmVjOGM4NDRlMzRhYTkwN2NiZmNkZDU5MDFmIiwidXNlcl9pZCI6Mjh9.z4xkwMtYP0MHtaPWNNclSWFtLle-gdw90VcKamjccdw";
const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
};
export const fetchExpertRateData = createAsyncThunk(
  "ExpertRateData",
  async () => {
    try {
      const res = await axios.get(`${EXPERT_RATE_API}`);
      console.log("response:", res.data);
      return res.data as RateExpert[];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const postExpertRating = createAsyncThunk(
  "postExpertRating",
  async (rateForm: { user: number; value: number; discription: string }) => {
    try {
      const response = await axios.post(`${EXPERT_RATE_API}`, rateForm, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.log(error as string);
    }
  }
);
export const updateExpertRating = createAsyncThunk(
  "updateExpertRating",
  async ({
    Id,
    rateForm,
  }: {
    Id: number | undefined;
    rateForm: { value: number; discription: string; user: number };
  }) => {
    try {
      const response = await axios.put(`${EXPERT_RATE_API}${Id}/`, {
        user: rateForm.user,
        value: rateForm.value,
        discription: rateForm.discription,
      });
      return response.data;
    } catch (error) {
      console.log(error as string);
      throw error;
    }
  }
);
const hiredExpertsRateApiSlice = createSlice({
  name: "expertRate",
  initialState: {
    expertRate: [],
    error: null as null | string,
  } as RateExpertState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpertRateData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        fetchExpertRateData.fulfilled,
        (state, action: PayloadAction<RateExpert[]>) => {
          state.expertRate = action.payload;
        }
      )
      .addCase(fetchExpertRateData.rejected, (state, action) => {
        state.error = action.error.message as string;
      });
  },
});

export default hiredExpertsRateApiSlice.reducer;
