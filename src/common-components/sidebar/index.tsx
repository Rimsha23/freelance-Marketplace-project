import React from "react";
import { Menu } from "antd";
import { time_tracker_icon } from "../../utils/constants";
import { log_history_icon } from "../../utils/constants";
import { engagements_icon } from "../../utils/constants";
import { billings_information_icon } from "../../utils/constants";
import { educational_center_icon } from "../../utils/constants";
import { refer_icon } from "../../utils/constants";
import { resource_area_icon } from "../../utils/constants";
import { team_icon } from "../../utils/constants";
import { benefits_icon } from "../../utils/constants";
import { signed_contracts_icon } from "../../utils/constants";
import { request_expert_icon } from "../../utils/constants";
import { approve_accounts_icon } from "../../utils/constants";
import { feedback_icon } from "../../utils/constants";
import { business_icon } from "../../utils/constants";
import { expert_icon } from "../../utils/constants";
import { add_content_icon } from "../../utils/constants";
import { push_notification_icon } from "../../utils/constants";
import { cross_icon } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { sideBarOpen } from "../../store/NavSideBarState/NavSideBarState";
import { Link } from "react-router-dom";

export const Sidebar: React.FC = () => {
  //active page to show that page highligthed in sidebar
  const dispatch = useDispatch();
  const currentPathname = window.location.pathname;
  const sideBarIsOpen = useSelector(
    (state: { navSideBarState: boolean }) => state.navSideBarState
  );
  //check whether the logged in user is of expert type, business type or admin to display respective elements.
  type StateProps = {
    userType: {
      userType: string;
    };
  };
  const userType: string = useSelector(
    (state: StateProps) => state.userType.userType
  );
  type objType = {
    id?: number;
    name?: string;
    link?: string;
    icon?: string;
  };
  //expert
  const expertSidebarElements: objType[] = [
    {
      id: 1,
      name: "Time Tracker",
      link: "/timetracker",
      icon: time_tracker_icon,
    },
    {
      id: 2,
      name: "Log History",
      link: "/loghours",
      icon: log_history_icon,
    },
    {
      id: 3,
      name: "Engagements",
      link: "/expert-engagements",
      icon: log_history_icon,
    },
    {
      id: 4,
      name: "Billing Information",
      link: "/billinginformation",
      icon: billings_information_icon,
    },
    {
      id: 5,
      name: "Educational Center",
      link: "/educationalcenter",
      icon: educational_center_icon,
    },
    {
      id: 6,
      name: "Refer",
      link: "/refer",
      icon: refer_icon,
    },
    {
      id: 7,
      name: "Resource Area",
      link: "/resource",
      icon: resource_area_icon,
    },
  ];
  //business
  const businessSidebarElements: objType[] = [
    {
      id: 1,
      name: "My Team",
      link: "/my_team",
      icon: team_icon,
    },
    {
      id: 2,
      name: "Benefits",
      link: "/benefits",
      icon: benefits_icon,
    },
    {
      id: 3,
      name: "Refer",
      link: "/business_refer",
      icon: refer_icon,
    },
    {
      id: 4,
      name: "Signed Contracts",
      link: "/signed_contracts",
      icon: signed_contracts_icon,
    },
    {
      id: 5,
      name: "Request Expert",
      link: "/request_expert",
      icon: request_expert_icon,
    },
  ];
  //admin
  const adminSidebarElements: objType[] = [
    {
      id: 1,
      name: "Approve Accounts",
      link: "/approveaccounts",
      icon: approve_accounts_icon,
    },
    {
      id: 2,
      name: "Feedback",
      link: "/feedback",
      icon: feedback_icon,
    },
    {
      id: 3,
      name: "Time Tracking",
      link: "/admintimetracking",
      icon: time_tracker_icon,
    },
    {
      id: 4,
      name: "Business",
      link: "/business",
      icon: business_icon,
    },
    {
      id: 5,
      name: "Expert",
      link: "/expert",
      icon: expert_icon,
    },
    {
      id: 6,
      name: "Engagements",
      link: "/admin-engagements",
      icon: engagements_icon,
    },
    {
      id: 7,
      name: "Referrals",
      link: "/referrals",
      icon: request_expert_icon,
    },
    {
      id: 8,
      name: "Add Content",
      link: "/add_content",
      icon: add_content_icon,
    },
    {
      id: 9,
      name: "Push Notifications",
      link: "/push_notifications",
      icon: push_notification_icon,
    },
  ];
  const sidebarElementsBasedOnUserType = userType
    ? userType === "expert"
      ? expertSidebarElements
      : userType === "business"
        ? businessSidebarElements
        : adminSidebarElements
    : [];
  return (
    <div>
      <Menu
        className={`h-full w-[17.06rem] bg-purple pt-5 px-3 hidden md:block`}
      >
        {sidebarElementsBasedOnUserType?.map((element: objType) => {
          return (
            <Link
              to={element.link ? element.link : ""}
              onClick={() =>
                window.location.replace(element.link ? element.link : "")
              }
              key={element.id}
            >
              <div
                key={element.id}
                className={`khula-text flex px-3 py-2 items-center md:text-sm text-white hover:bg-transparent hover:rounded-lg hover:cursor-pointer   ${
                  currentPathname == element.link
                    ? "rounded-lg bg-transparent"
                    : ""
                }`}
              >
                <div className="w-5 h-5 mt-1 mr-3">
                  <img src={element.icon} />
                </div>
                {element.name}
              </div>
            </Link>
          );
        })}
      </Menu>
      {/* For mobiles */}
      {/*  */}
      <Menu
        className={`h-screen fixed w-[273px] bg-purple pt-3 px-3 sm:hidden z-10 ${
          sideBarIsOpen ? "" : " -left-[274px]"
        }`}
      >
        <div className="flex justify-end">
          <img
            className="w-5 h-5"
            src={cross_icon}
            onClick={() => dispatch(sideBarOpen(false))}
          />
        </div>
        {sidebarElementsBasedOnUserType.map((element: objType) => {
          return (
            <>
              <div
                className={`khula-text flex m-1 ml-1 px-3 py-2 text-sm text-white hover:bg-transparent hover:rounded-lg hover:cursor-pointer   ${
                  currentPathname == element.link
                    ? "rounded-lg bg-transparent"
                    : ""
                }`}
              >
                <div className="w-5 h-5 mt-1 mr-3">
                  <img src={element.icon} />
                </div>
                {element.name}
              </div>
            </>
          );
        })}
      </Menu>
    </div>
  );
};
