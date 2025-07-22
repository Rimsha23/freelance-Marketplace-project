import { Button } from "antd";
import { useState } from "react";
import NotifDropDownComponent from "../../app-components/NotificationDropDown/NotificationDropDown";
import SVGIcon from "../../common-components/SVgicon";
import NotificationsCard from "../../common-components/NotificationsCard/NotificationsCard";
import { ArrowIcon, settingIcon } from "./NotificatonsIcons";

type notificationsDemoArrayType = {
  text: string;
  id: number;
  isRead: boolean;
}

const notificationsDemoArray: notificationsDemoArrayType[] = [
  {
    text: 'Account Approval Notification',
    id: 2,
    isRead: false
  },
  {
    text: 'Account Creation Confirmation message',
    id: 3,
    isRead: false
  },
  {
    text: 'Upselling additional experts is placed at $500 incentive',
    id: 4,
    isRead: true
  },
  {
    text: 'Account Approval Notification',
    id: 5,
    isRead: false
  },
  {
    text: 'Account Creation Confirmation message',
    id: 6,
    isRead: true
  },
]




const Notifications: React.FC = () => {
  const [notificationDropDown, setNotificationDropDown] =
    useState<boolean>(false);
  return (
        <div className="w-[1073px] mt-[39px] md:mx-[45px] px-1 md:px-0">
          <div className=" w-full flex justify-between items-center relative mb-[27px]">
            <h1 className="libre-caslon-text text-[22px] text-[#CACACA] font-bold">
              Notifications
            </h1>
            <Button
              shape="round"
              icon={<SVGIcon icon={settingIcon} className="p-1 mt-1" />}
              className="md:h-[42px] flex items-center justify-center border-[1px] bg-white text-sm text-[#3A0F7D] border-blue-700"
              onClick={() => setNotificationDropDown(!notificationDropDown)}
            >
              <span>Notification</span>
              <span className="md:ml-[41px] ml-2">
                <SVGIcon icon={ArrowIcon} className={`p-2 mt-1 ${notificationDropDown ? 'rotate-180 duration-300' : "duration-300"}`} />
              </span>
            </Button>
            {/* DropDownbuttons */}
            <NotifDropDownComponent notificationDropDown={notificationDropDown} className="top-12 right-0" />
          </div>
          {
            notificationsDemoArray.map((notification) => {
              return (
                <NotificationsCard notification={notification} />
              )
            })
          }
        </div>
  );
};

export default Notifications;
