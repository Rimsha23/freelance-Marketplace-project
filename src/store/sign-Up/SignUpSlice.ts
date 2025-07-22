import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { SignUpApi } from '../../utils/api-urls';

interface SignUpFormData {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
    user_choices:null;
}
export const signup = createAsyncThunk('signup', async (formData: SignUpFormData) => {
  try {
    const response = await axios.post(SignUpApi, formData);
    console.log("response",response.data)

  } catch (error) {
    console.error('sign up failed',error)
    throw new Error('Signup failed. Please try again.'); 
  }
});
const authSlice = createSlice({
  name: 'authorization',
  initialState: {
    user: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(signup.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload !== undefined ? action.payload : null;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});

export default authSlice.reducer;
