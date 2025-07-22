import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from "./userType";
import expertEngagementsReducer from "./expertEngagements";
import expertActiveEngagementsReducer from "./expertActiveEngagements";
import NavSideBarState from "./NavSideBarState/NavSideBarState";
import hiredExpertsRateApiSlice from './ExpertRateSlice/ExpertRatingSlice'
import HiredExpertsListSlice from "./HiredExpertsList/HiredExpertsListSlice";
import AllExpertsProfile from "./AllExpertsProfiles/AllExpertsProfile";
import ChangePasswordSlice from "./ChangePasswordSlice";
import feedbackReducer from "./FeedbackSlice/feedbackslice"
import TimeTrackingSlice, { getEngagementsApi } from "./TimeTracker/TimeTrackingSlice";
import authorization from "./sign-Up/SignUpSlice"
import authLogin from "./login/loginSlice"
import authForgot from "./forgot-password/forgotSlice"
import referGetSlice from "./referPage/referGetSlice";
import referPostSlice from "./referPage/referPostSlice";
import expertEngagementsRequestedHours from "./expertEngaementsRequestedHours";
import expertEngagementsHistory from "./expertEngagementsHistory";
import referBusinessGetSlice from "./referPage/referBusinessGetSlice";
import referBusinessPostSlice from "./referPage/referBusinessPostSlice";
import feedbackDataSlice from './adminFeedback/adminFeedback'
import replyFeedbackSplice from "./ReplyFeedback/replyFeedbackSplice";
import accountSlice from "./accountSlice";
import {getAccountsApi } from "./ApproveAccounts/ApproveAccunts";
import pushNotificationSlice from "./pushNotification/pushNotificationSlice";
import allAcountSlice from "./allAcountSlice/allAcountSlice";
import learningData from "./learningResources/index"
import allRegisteredUsers from "./allRegisteredUsers"
export const store = configureStore({
    reducer: {
        userType: userTypeReducer,
        expertEngagements: expertEngagementsReducer,
        navSideBarState : NavSideBarState,
        expertData: HiredExpertsListSlice,
        expertRate: hiredExpertsRateApiSlice,
        expertProfiles:AllExpertsProfile,
        activeEngagements: expertActiveEngagementsReducer,
        expertEngagementsRequestedHours: expertEngagementsRequestedHours,
        expertEngagementsHistory: expertEngagementsHistory,
        changePasswordSlice : ChangePasswordSlice,
        feedbackApi : feedbackReducer,
        fetchApiData : accountSlice,
        authorization:authorization,
        authLogin:authLogin,
        authForgot:authForgot,
        refergetSlice: referGetSlice,
        referpostSlice: referPostSlice,
        loghours : TimeTrackingSlice,
        referBusinessGetSlice: referBusinessGetSlice,
        referBusinessPostSlice: referBusinessPostSlice,
        feedbackData:feedbackDataSlice,
        replyFeedbackSlice:replyFeedbackSplice,
        pushNotifications:pushNotificationSlice,
        allAccounts:allAcountSlice,
        learningData:learningData,
        allRegisteredUsers:allRegisteredUsers,
        [getEngagementsApi.reducerPath] : getEngagementsApi.reducer,
        [getAccountsApi.reducerPath] : getAccountsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getEngagementsApi.middleware , getAccountsApi.middleware),
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
