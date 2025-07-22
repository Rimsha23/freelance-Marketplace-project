import { createSlice} from '@reduxjs/toolkit';

interface userTypeState {
  userType?: string;
}

const type = localStorage.getItem("userType")

const initialState: userTypeState = {
  userType: type ? type : "",
};

const userTypeSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {},
});

export default userTypeSlice.reducer;