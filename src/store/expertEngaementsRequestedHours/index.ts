import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token, userId } from "../../utils/constants";
import { delete_hours_request_api, expert_engagement_requested_hours_api, update_engagement_api } from "../../utils/api-urls";

//fetch requested hours from client(business) for expert engagements
export const getExpertEngagementsRequestedHours = createAsyncThunk(
    "/getExpertEngagementsRequestedHours",
    async () => {
        const response = await axios.get(expert_engagement_requested_hours_api, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Requested Hours", response.data);
        return response.data;
    }
);

//update hours payload type
export type UpdateHoursType = {
    id: number,
    hours: number,
    requestedHours: number
}

//update hours for expert engagements
export const updateExpertEngagementHours = createAsyncThunk(
    "/updateExpertEngagementHours",
    async (data: UpdateHoursType) => {
        const response = await axios.patch(`${update_engagement_api}${data.id}`, { hours: data.hours + data.requestedHours }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Requested Hours", response.data);
        return response.data;
    }
);

//delete requested hours request
export const deleteRequestedHoursRequest = createAsyncThunk('/deleteRequestedHoursRequest', async (id: number | undefined) => {
    const response = await axios.delete(`${delete_hours_request_api}${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
});

export type ExpertEngagementsRequestedHoursType = {
    id: number,
    hours_to_increars: number,
    is_ongoing: string,
    description: string,
    bussiness_name: {
        id: number,
        full_name: string,
    },
    engagement: {
        id: number,
        name: string,
        created_by: string,
    }
}

type ActiveEngagementState = {
    expertEngagementsRequestedHours?: ExpertEngagementsRequestedHoursType[];
};

const initialState: ActiveEngagementState = {
    expertEngagementsRequestedHours: [],
};

const ExpertActiveEngagementsSlice = createSlice({
    name: "expert_engagement_requested_hours",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getExpertEngagementsRequestedHours.fulfilled, (state, action) => {
            state.expertEngagementsRequestedHours = action.payload.filter(
                (engagement: ExpertEngagementsRequestedHoursType) => engagement.bussiness_name.id == userId
            );
        });
    },
    reducers: {},
});
export default ExpertActiveEngagementsSlice.reducer;
