import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { forgotApi } from '../../utils/api-urls';

interface forgotFormData {
    email: string;

}

export const forgotPassword = createAsyncThunk('forgotPAssword', async (formData: forgotFormData) => {
    try {
        const response = await axios.post(forgotApi, formData);
        console.log("response", response.data)

    } catch (error) {
        console.error('forgot password failed', error)
        throw new Error('Failed. Please try again.');
    }
});

const authSlice = createSlice({
    name: 'authForgot',
    initialState:
    {
        user: null as string | null,
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload !== undefined ? action.payload : null;
                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message !== undefined ? action.error.message : null;
            });
    },
});

export default authSlice.reducer;
