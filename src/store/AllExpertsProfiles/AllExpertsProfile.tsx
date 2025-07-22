import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import { ALL_EXPERTS_PROFILES } from "../../api/base-api";
export interface ExpertProfile {
  id: number;
  user: number | undefined;
  full_name: string;
}

export interface ExpertProfileState {
  expertProfiles: ExpertProfile[];
  error: string | null;
}

const headers = {
  "Content-Type": "application/json",
};

export const fetchExpertProfiles = createAsyncThunk(
  "ExpertProfile",
  async () => {
    try {
      const res = await axios.get(
        `${ALL_EXPERTS_PROFILES}`,
        { headers }
      );
      console.log(res.data);
      return res.data as ExpertProfile[];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const ExpertProfileSlice = createSlice({
  name: "FetchExpertProfiles",
  initialState: {
    expertProfiles: [] as ExpertProfile[],
    loading: false,
    error: null,
  } as ExpertProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpertProfiles.pending, (state) => {
        state.error = null;
      })
      .addCase(
        fetchExpertProfiles.fulfilled,
        (state, action: PayloadAction<ExpertProfile[]>) => {
          state.expertProfiles = action.payload;
        }
      )
      .addCase(fetchExpertProfiles.rejected, (state, action) => {
        state.error = action.error.message as string;
      });
  },
});

export default ExpertProfileSlice.reducer;
