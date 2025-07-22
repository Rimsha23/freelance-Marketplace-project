import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token, userId } from "../../utils/constants";
import {active_engagements_history} from "../../utils/api-urls";

export type EngagementType = {
    id: number,
    created_by: string,
    expert: number,
    description: string,
    name: string,
    ongoing: boolean,
    start_date: string,
    rate: number,
    hours: number,
    weekly_commitment: number,
    is_active: boolean,
};

type ActiveEngagementsHistoryState = {
    activeEngagementsHistory?: EngagementType[];
};

const initialState: ActiveEngagementsHistoryState = {
    activeEngagementsHistory: [],
};

//fetch exprt active engagements history 
export const getActiveEngagementsHistory = createAsyncThunk(
    "/getActiveEngagementsHistory",
    async () => {
        const response = await axios.get(active_engagements_history, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Engagements history", response.data);
        return response.data;
    }
);

const ExpertActiveEngagementsSlice = createSlice({
    name: "expert_active_engagements_history",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getActiveEngagementsHistory.fulfilled, (state, action) => {
            state.activeEngagementsHistory = action.payload.filter(
                (engagement: EngagementType) => engagement.expert == userId
            );
        });
    },
    reducers: {},
});
export default ExpertActiveEngagementsSlice.reducer;
