import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { learningAcces_token, learningApi } from '../../utils/api-urls';

//getting data 
export const getLearningData = createAsyncThunk('getLearningData', async () => {
    try {
        const response = await axios.get(learningApi, { headers: { Authorization: `Bearer ${learningAcces_token}` } });
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        console.error('fetching data is failed', error);
        throw new Error('Failed to fetch data. Please try again.');
    }
});
const authSlice = createSlice({
    name: 'learningData',
    initialState: {
        user: [],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLearningData.pending, (state) => {
                state.loading = true;
                state.user = [];
                state.error = null;
            })
            .addCase(getLearningData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getLearningData.rejected, (state, action) => {
                state.loading = false;
                state.user = [];
                state.error = action.error.message !== undefined ? action.error.message : null;
            });
    },
});

export default authSlice.reducer;
