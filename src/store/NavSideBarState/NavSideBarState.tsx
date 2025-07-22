import { createSlice } from '@reduxjs/toolkit'

const NavSidebarSlice = createSlice({
    name: 'Nav Sidebar State',
    initialState: false,
    reducers: {
        sideBarOpen(state, action) {
            return action.payload
        }
    }
})
export default NavSidebarSlice.reducer;
export const { sideBarOpen } = NavSidebarSlice.actions
