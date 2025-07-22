import React from "react";
import { Link } from "react-router-dom";
type objType = {
  title: string;
  link: string;
};
const SettingsSidebar: React.FC<{ className?: string }> = ({ className }) => {
  const settingsOptions: objType[] = [
    {
      title: "Privacy Policy",
      link: "/privacy_policy",
    },

    {
      title: "Terms & Conditions",
      link: "/terms_&_conditions",
    },

    {
      title: "Change Password",
      link: "/change_password",
    },

    {
      title: "Feedback",
      link: "/feedback",
    },

    {
      title: "Notification Settings",
      link: "/notification_settings",
    },

    {
      title: "Delete Account",
      link: "/delete_account",
    },

    {
      title: "Logout",
      link: "/logout",
    },
  ];

  const activeLink = window.location.pathname;

  return (
    <div
      className={` p-4 mt-10 lg:ml-1 ml-0 lg:h-screen h-40 w-[291px] ${className}`}
    >
      <h2 className="text-[22px] text-[#CACACA] libre-caslon-text font-semibold mb-4">
        Settings
      </h2>
      <div>
        <div className=" bg-white mt-4  bg-[#FFFFF] rounded-lg  border-2 border-neutral-200 h-96">
          <div className="mt-7 sm:text-center md:text-center"></div>
          {settingsOptions.map((element, index) => (
            <Link to={element.link} key={index}>
              <div
                className={`flex items-center  ${
                  activeLink === element.link ? " font-semibold" : ""
                }`}
              >
                {activeLink === element.link ? (
                  <div className="rounded-r-lg bg-[#3A0F7D] h-[15px] mb-4 w-[5px] shrink-0"></div>
                ) : (
                  ""
                )}
                <li
                  className={`list-none khula-text text-[14px] ${
                    activeLink === element.link
                      ? "text-[#3A0F7D] cursor-pointer pl-4 mb-3 "
                      : "text-[#808080] cursor-pointer hover:text-gray-700 pl-4 mb-3"
                  }`}
                >
                  {element.title}
                </li>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
