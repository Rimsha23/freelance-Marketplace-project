import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { expert_upsell_api, expertise_list } from '../../utils/api-urls';
import { admin_token } from '../../utils/api-urls';
import { token } from '../../utils/constants';

export type SuggestionType = {
  client?: number,
  area_of_expertisee?: string,
  description?: string,
}

export type ExpertiseType = {
  id: number,
  name: string,
}

interface ExpertEngagementsState {
  expertsSuggestionToHireNewExpert?: SuggestionType[],
  expertiseList?: ExpertiseType[],
}

const initialState: ExpertEngagementsState = {
  expertsSuggestionToHireNewExpert: [],
  expertiseList: []
};

// fetch expertiseList from api
export const getExpertiseList = createAsyncThunk('/getExpertiseList', async () => {
  const response = await axios.get(expertise_list, { headers: { Authorization: `Bearer ${admin_token}` } });
  console.log("expertise", response.data)
  return response.data;
});

// Add suggestion to API
export const postSuggestion = createAsyncThunk('/postSuggestion', async (suggestion: SuggestionType) => {
  const response = await axios.post(expert_upsell_api, suggestion, { headers: { Authorization: `Bearer ${token}` } });
  console.log(response.data);
  return response.data;
});

// fetch suggestions from api
export const getSuggestion = createAsyncThunk('/getSuggestions', async () => {
  const response = await axios.get(expert_upsell_api, { headers: { Authorization: `Bearer ${admin_token}` } });
  console.log("suggestions", response.data)
  return response.data;
});

const ExpertEngagementsSlice = createSlice({
  name: 'expert_engagements',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestion.fulfilled, (state, action) => {
        state.expertsSuggestionToHireNewExpert = action.payload;
      })
      .addCase(getExpertiseList.fulfilled, (state, action) => {
        state.expertiseList = action.payload;
      })
  },
  reducers: {},
});
export default ExpertEngagementsSlice.reducer;