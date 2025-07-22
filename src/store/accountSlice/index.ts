import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { expert_deleteAccount_api } from "../../utils/api-urls";
import { token, userId } from "../../utils/constants";

const header = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
export const fetchApiData = createAsyncThunk("fetchData", async () => {
  try {
    const response = await axios.delete(
      `${expert_deleteAccount_api}${userId}/`,
     { headers: header }
    );
    console.log(response.data, "response");
    return response.data;
  } catch (error) {
    console.log(error, "catch error");
    throw error;
  }
});

export const accountSlice = createSlice({
  name: "delete",
  initialState: { id: null },
  reducers: {},
  extraReducers: () => {
  },
});

export default accountSlice.reducer;