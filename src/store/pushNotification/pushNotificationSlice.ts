
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface AdminNotification {
  id?: number | undefined;
  sent_to: number[];
  Notification_name:string;
  activation_time:string;
}

export interface AdminNotificationState {
  adminNotification: AdminNotification[];
  error: string | null;
}

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzQ1NTk3LCJpYXQiOjE3MDM3NTM1OTcsImp0aSI6ImU1MTM2YTNkMzFhZjQ4OGZhNmEzNGMyYmYxZWNlMjUwIiwidXNlcl9pZCI6NTQzMDV9.WtDarFhaMHNhuS1Ry6djT_FQnU0pvh9TUI-3EgwG9pA";

const headers = {
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
};
//Asunc thunk for fetching feedback reply data
export const fetchAdminNotification = createAsyncThunk("AdminNotification", async () => {
  try {
    const res = await axios.get(
      `https://gitlub.pythonanywhere.com/admin_user/pushnotificationview/`,
      { headers }
    );
    console.log(res.data);
    return res.data as AdminNotification[];
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//Async thunk for posting Admin's reply to user on feedback

export const addNewAdminNotification = createAsyncThunk(
  "AddNewAdminNotification",
  async (newAdminNotification: AdminNotification) => {
    try {
      const res = await axios.post(
        `https://gitlub.pythonanywhere.com/admin_user/pushnotificationview/`,
        newAdminNotification,
        {
          headers,
        }
      );
      console.log(res.data);
      return res.data as AdminNotification;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteAdminNotification = createAsyncThunk(
    "DeleteAdminNotification",
    async (id: number | undefined) => {
      try {
        console.log("Deleting admin notification with id:", id);
        const res = await axios.delete(
          `https://gitlub.pythonanywhere.com/admin_user/pushnotificationview/${id}/`,
          { headers }
        );
        console.log("Delete response:", res.data);
        return res.data as AdminNotification;
      } catch (error) {
        console.error("Delete error:", error);
        throw error;
      }
    }
  );
  export const updateAdminNotification = createAsyncThunk(
    "UpdateAdminNotification",
    async (updatedNotification: AdminNotification) => {
      try {
        const res = await axios.put(
          `https://gitlub.pythonanywhere.com/admin_user/pushnotificationview/${updatedNotification.id}/`,
          updatedNotification,
          {
            headers,
          }
        );
        console.log(res.data);
        return res.data as AdminNotification; 
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );
  
  
const PushNotificationSlice = createSlice({
  name: "adminNotification",
  initialState: {
    adminNotification: [],
    error:  null,
  } as AdminNotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminNotification.pending, (state) => {
        state.error = null;
      })
      .addCase(
        fetchAdminNotification.fulfilled,
        (state, action: PayloadAction<AdminNotification[]>) => {
          state.adminNotification = action.payload;
        }
      )
      .addCase(fetchAdminNotification.rejected, (state, action) => {
        state.error = action.error.message as string;
      });
  },
});

export default PushNotificationSlice.reducer;