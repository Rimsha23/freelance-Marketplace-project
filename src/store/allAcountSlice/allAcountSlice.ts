import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

export interface AllAcounts {
  id: number;
  username: string;
  email: string;
}

export interface AllAccountsState {
  allAcounts: AllAcounts[];
  error: string | null;
}

const headers = {
  "Content-Type": "application/json",
};

export const fetchAllAccounts = createAsyncThunk(
  "AllAccounts",
  async () => {
    try {
      const res = await axios.get(
        `https://gitlub.pythonanywhere.com/admin_user/allaccounts/`,
        { headers }
      );
      console.log(res.data);
      return res.data as AllAcounts[];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const AllAccounts = createSlice({
  name: "FetchAllAccounts",
  initialState: {
    allAcounts: [] as AllAcounts[],
    loading: false,
    error: null,
  } as AllAccountsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAccounts.pending, (state) => {
        state.error = null;
      })
      .addCase(
        fetchAllAccounts.fulfilled,
        (state, action: PayloadAction<AllAcounts[]>) => {
          state.allAcounts = action.payload;
        }
      )
      .addCase(fetchAllAccounts.rejected, (state, action) => {
        state.error = action.error.message as string;
      });
  },
});

export default AllAccounts.reducer;