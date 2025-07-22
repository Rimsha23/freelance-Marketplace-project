import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { token, userId } from "../../utils/constants";
import {
    active_engagements,
    expert_accept_engagement_api,
    expert_end_engagement_api,
    expert_request_hours_api,
} from "../../utils/api-urls";

export type EngagementType = {
    created_by: string;
    description: string;
    expert: {
        full_name: string;
        id: number;
    };
    hours: number;
    id: number;
    is_active: boolean;
    name: string;
    ongoing: boolean;
    rate: number;
    start_date: string;
    weekly_commitment: number;
};

type RequestHoursProps = {
    engagement: number,
    hours_to_increase: number,
    id: number,
    ongoing_engagement: string,
    request_description: string,
    user: number,
}

type EndEngagementRequestProps = {
    link?: string,
    description?: string,
}

type ActiveEngagementState = {
    activeEngagements?: EngagementType[];
};

const initialState: ActiveEngagementState = {
    activeEngagements: [],
};

//fetch engagements from business/createandreteriveengagement api 
export const getActiveEngagements = createAsyncThunk(
    "/getActiveEngagements",
    async () => {
        const response = await axios.get(active_engagements, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Engagements", response.data);
        return response.data;
    }
);

// Send extra hours request to API
export const sendExtraHoursRequest = createAsyncThunk(
    "/sendExtraHoursRequest",
    async (hoursRequest: RequestHoursProps) => {
        const response = await axios.post(expert_request_hours_api, hoursRequest, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Response:", response.data);
        return response.data;
    }
);

//Get end engagement requests from API
export const getEndEngagementRequest = createAsyncThunk(
    "/getEndEngagementRequest",
    async () => {
        const response = await axios.get(expert_end_engagement_api, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Ended engagements:", response.data);
        return response.data;
    }
);

// Send end engagement request to API
export const sendEndEngagementRequest = createAsyncThunk(
    "/sendEndEngagementRequest",
    async (endEngagementRequest: EndEngagementRequestProps) => {
        const response = await axios.post(
            expert_end_engagement_api,
            endEngagementRequest,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Response:", response.data);
        return response.data;
    }
);

// update engagement in API
export const updateEngagement = createAsyncThunk(
    "/acceptEngagement",
    async (id: number) => {
        const response = await axios.patch(
            `${expert_accept_engagement_api}${id}`,
            { ongoing: true },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Accepted Engagement:", response.data);
        return response.data;
    }
);

const ExpertActiveEngagementsSlice = createSlice({
    name: "expert_active_engagements",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getActiveEngagements.fulfilled, (state, action) => {
            state.activeEngagements = action.payload.filter(
                (engagement: EngagementType) => engagement.expert.id == userId
            );
        });
    },
    reducers: {},
});
export default ExpertActiveEngagementsSlice.reducer;
