import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { all_created_accounts } from '../../utils/api-urls';
import { token } from '../../utils/constants';

export type RegisteredUserType = {
    id: number,
    full_name: string,
    email: string,
    username: string,
    user_choices: string
}

type RegisteredUsersState = {
    registeredUsers?: RegisteredUserType[];
};

const initialState: RegisteredUsersState = {
    registeredUsers: [],
};


// fetch all registered users from api
export const getRegisteredUsers = createAsyncThunk('/getRegisteredUsers', async () => {
    const response = await axios.get(all_created_accounts, { headers: { Authorization: `Bearer ${token}` } });
    console.log("all registered users:", response.data)
    return response.data;
});

const AllRegisteredUsersSlice = createSlice({
    name: 'all_registered_users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getRegisteredUsers.fulfilled, (state, action) => {
            state.registeredUsers = action.payload
        });
    },
    reducers: {},
});

export default AllRegisteredUsersSlice.reducer;
