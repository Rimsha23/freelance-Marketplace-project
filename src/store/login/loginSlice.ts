import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginApi } from '../../utils/api-urls';

interface LoginFormData 
    {
        email:string,
        password: string
    }

export const login = createAsyncThunk('login', async (formData: LoginFormData) => {
  try {
    const response = await axios.post(LoginApi, formData);
    const authToken = response.data.access_token;
    const userType = response.data.User_Type;
    const payloadBase64 = authToken.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const userId = decodedPayload.user_id;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userType', userType);
        localStorage.setItem('userId', userId);
    console.log("response",response)
  } catch (error) {
    console.error('login failed',error)
    throw new Error('Login failed. Please try again.'); 
  }
});

const authSlice = createSlice({
  name: 'authLogin',
  initialState: {
    user: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload !== undefined ? action.payload : null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message !== undefined ? action.error.message : null;
      });
  },
});

export default authSlice.reducer;
