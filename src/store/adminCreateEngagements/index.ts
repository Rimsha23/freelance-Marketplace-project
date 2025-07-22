import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { active_engagements } from '../../utils/api-urls';
import { token } from '../../utils/constants';
import { Moment } from 'moment';

export type EngagementType = {
    expert: number,
    description: string,
    name: string,
    ongoing: boolean,
    start_date: Moment | string,
    rate: number,
    hours: number,
    weekly_commitment: number,
    is_active: boolean
}

// fetch business profiles from api to get clients
export const createEngagement = createAsyncThunk('/createEngagement', async (engagement: EngagementType) => {
    const response = await axios.post(active_engagements, engagement, { headers: { Authorization: `Bearer ${token}` } });
    console.log("new engagement", response.data)
    return response.data;
});

export const AdminCreateEngagementsSlice = createSlice({
    name: 'admin_create_engagements',
    initialState: [],
    reducers: {},
});
