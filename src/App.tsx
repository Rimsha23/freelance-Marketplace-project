import "./App.css";
import Navbar from "./app-components/navbar";
import { Sidebar } from "./common-components/sidebar";
import * as AllExports from "../src/utils/routes";
import AllowNotification from "./common-components/allowNotificationToken";
const {
  Notifications,
  TimeTracker,
  BillingInformation,
  SignUp,
  Welcome,
  Engagements,
  ReferMainPage,
  ResourceAreaMainPage,
  ManageContractsPage,
  ReferralHistoryPage,
  ExpertActiveEngagements,
  ExpertEngagementsRequestedHours,
  ExpertActiveEngagementsHistory,
  SettingsPrivacyPolicy,
  SettingFeedback,
  NotificatinSetting,
  SettingDeleteAccount,
  EducationalScreen,
  ForgotPassword,
  Login,
  Change_Password,
  MyTeam,
  LogHours,
  SettingsTermsConditions,
  Benefits,
  ApproveAccounts,
  AdminEngagementsMainPage,
  AdminFeedback,
  TimeTrackingAdmin,
  LearningResources,
} = AllExports;

import { useSelector } from "react-redux";
import { RootState } from "./store/root-store";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminNotifications from "./pages/Admin-Notifications/AdminNotifications";
import PushNotification from "./pages/PushNotfications-Admin";
import ApplyingExpertise from "./pages/ApplyingExpertise";

//common routes
const common_routes = [
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
];

//expert pages routes
const expert_routes = [
  {
    path: "/timetracker",
    element: <TimeTracker />,
  },
  {
    path: "/loghours",
    element: <LogHours />,
  },
  {
    path: "/billinginformation",
    element: <BillingInformation />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/expert-engagements",
    element: <Engagements />,
  },
  {
    path: "/expert-active-engagements",
    element: <ExpertActiveEngagements />,
  },
  {
    path: "/expert-engagements-requested-hours",
    element: <ExpertEngagementsRequestedHours />,
  },
  {
    path: "/expert-engagements-history",
    element: <ExpertActiveEngagementsHistory />,
  },
  {
    path: "/privacy_policy",
    element: <SettingsPrivacyPolicy />,
  },
  {
    path: "/terms_&_conditions",
    element: <SettingsTermsConditions />,
  },
  {
    path: "/refer",
    element: <ReferMainPage />,
  },
  {
    path: "/resource",
    element: <ResourceAreaMainPage />,
  },
  {
    path: "/managecontract",
    element: <ManageContractsPage />,
  },
  {
    path: "/referralhistory",
    element: <ReferralHistoryPage />,
  },
  {
    path: "/change_password",
    element: <Change_Password />,
  },
  {
    path: "/feedback",
    element: <SettingFeedback />,
  },
  {
    path: "/notification_settings",
    element: <NotificatinSetting />,
  },
  {
    path: "/delete_account",
    element: <SettingDeleteAccount />,
  },
  {
    path: "/educationalcenter",
    element: <EducationalScreen />,
  },
  {
    path: "/learning",
    element: <LearningResources />,
  },
  {
    path: "/applyexpertise",
    element: <ApplyingExpertise />,
  }
];

//business pages routes
const business_routes = [
  {
    path: "/my_team",
    element: <MyTeam />,
  },
  {
    path: "/benefits",
    element: <Benefits />,
  },
  
];

//admin pages routes
const admin_routes = [
  {
    path: "/approveaccounts",
    element: <ApproveAccounts />,
  },
  {
    path: "/admin-engagements",
    element: <AdminEngagementsMainPage />,
  },
  {
    path: "/admin_feedback",
    element: <AdminFeedback />,
  },
  {
    path: "/admintimetracking",
    element: <TimeTrackingAdmin />,
  },
  {
    path: "/adminnotifications",
    element: <AdminNotifications />,
  },
  {
    path: "/push_notifications",
    element: <PushNotification />,
  },
];

//common
const commonRouter = createBrowserRouter(common_routes);
//expert
const allExpertRoutes = [...expert_routes, ...common_routes];
const expertRouter = createBrowserRouter(allExpertRoutes);
//business
const allBusinessRoutes = [...business_routes, ...common_routes];
const businessRouter = createBrowserRouter(allBusinessRoutes);
//admin
const allAdminRoutes = [...admin_routes, ...common_routes];
const adminRouter = createBrowserRouter(allAdminRoutes);

function App() {
  //getting user type from store
  const userType = useSelector((state: RootState) => state.userType.userType);
  console.log(userType);
  const currentPath = window.location.pathname;
  const pathsToExcludeNavbarSidebar = [
    "/signup",
    "/login",
    "/",
    "/forgotpassword",
  ];
  const shouldShowNavbarSidebar =
    !pathsToExcludeNavbarSidebar.includes(currentPath) && userType;
  return (
    <>
      {shouldShowNavbarSidebar && <Navbar />}
      <div className={shouldShowNavbarSidebar ? "flex" : ""}>
        {shouldShowNavbarSidebar && <BrowserRouter>< Sidebar /></BrowserRouter>}
        {userType ? (
          userType === "expert" ? (
            <RouterProvider router={expertRouter} />
          ) : userType === "business" ? (
            <RouterProvider router={businessRouter} />
          ) : userType === "admin" ? (
            <RouterProvider router={adminRouter} />
          ) : (
            <RouterProvider router={commonRouter} />
          )
        ) : (
          <RouterProvider router={commonRouter} />
        )}
      </div>
      <AllowNotification/>
    </>
  );
}

export default App;
