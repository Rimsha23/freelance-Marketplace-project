import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { expert_change_password_api } from "../../utils/api-urls";
import { expert_token } from "../../utils/api-urls";

interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}
const header = {
  Authorization: `Bearer ${expert_token}`,
  "Content-Type": "application/json",
};
export const changePassword = createAsyncThunk(
  "changePassword",
  async (formData: ChangePasswordData) => {
    try {
      const response = await axios.post(
        expert_change_password_api,
        formData,
        { headers: header }
      );

      console.log("response", response.data);
    } catch (error) {
      console.error("Change password failed", error);
      throw new Error("failed.... Please try again.");
    }
  }
);
const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: {
    user: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload !== undefined ? action.payload : null;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error =
          action.error.message !== undefined ? action.error.message : null;
      });
  },
});

export default changePasswordSlice.reducer;