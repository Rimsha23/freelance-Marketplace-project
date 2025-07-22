import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import { ADD_MEMBER_API } from "../../api/base-api";
export interface Expert {
  additional_info: string;
  area_of_expertise: string[];
  digital_marketing: string;
  image: string | null | undefined;
  name_of_expert: string | undefined;
  rating: number;
  title: string;
  weekly_commitment: number;
}
interface Member {
  additional_info: string;
  title: string;
  digital_marketing: string;
  weekly_commitment: number;
  name_of_expert: string;
}

export interface ExpertState {
  experts: Expert[];
  error: string | null;
}

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1MjEyODQ4LCJpYXQiOjE3MDI2MjA4NDgsImp0aSI6IjMyMTM4NmVjOGM4NDRlMzRhYTkwN2NiZmNkZDU5MDFmIiwidXNlcl9pZCI6Mjh9.z4xkwMtYP0MHtaPWNNclSWFtLle-gdw90VcKamjccdw";
const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
};

export const fetchExpertData = createAsyncThunk("ExpertData", async () => {
  try {
    const res = await axios.get(`${ADD_MEMBER_API}`, { headers });
    console.log(res.data);
    return res.data as Expert[];
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const addNewMember = createAsyncThunk(
  "AddNewMember",
  async (newMemberData: Member) => {
    try {
      const res = await axios.post(`${ADD_MEMBER_API}`, newMemberData, {
        headers,
      });
      console.log(res.data);
      return res.data as Expert;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const ExpertDataSlice = createSlice({
  name: "FetchExpertData",
  initialState: {
    experts: [],
    error: null,
  } as ExpertState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpertData.pending, (state) => {
        state.error = null;
      })
      .addCase(
        fetchExpertData.fulfilled,
        (state, action: PayloadAction<Expert[]>) => {
          state.experts = action.payload;
        }
      )
      .addCase(fetchExpertData.rejected, (state, action) => {
        state.error = action.error.message as string;
      });
  },
});

export default ExpertDataSlice.reducer;
