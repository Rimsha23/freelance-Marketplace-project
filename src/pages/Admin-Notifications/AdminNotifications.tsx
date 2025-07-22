import { Button, Table } from "antd";
import SVGIcon from "../../common-components/SVgicon";
import { BlackBillIcon, GreenBillIcon } from "../Notifications/NotificatonsIcons";


function AdminNotifications() {
  return (
    <div className="w-[1073px] mt-[39px] md:mx-[45px] px-1 md:px-0 khula-text">
      <div className=" w-full lg:flex justify-between items-center relative mb-[27px]">
        <h1 className="libre-caslon-text text-[22px] text-[#CACACA] font-bold">
          Notifications
        </h1>
        <div className="md:flex gap-3">
          <Button
            shape="round"
            className="md:h-[42px] flex items-center justify-center font-bold border-[1px] bg-white text-sm text-[#3A0F7D] border-blue-700"
          >
            Close Billing Period
          </Button>
          <Button
            shape="round"
            className="md:h-[42px] flex items-center justify-center font-bold border-[1px] bg-white text-sm text-[#3A0F7D] border-blue-700"
          >
            Hour Reminder
          </Button>
          <Button
            shape="round"
            className="md:h-[42px] flex items-center justify-center font-bold border-[1px] bg-white text-sm text-[#3A0F7D] border-blue-700"
          >
            Onboarding
          </Button>
        </div>
      </div>
      <Table className="mt-10"
        columns={[
          {
            title: "Notification Details",
            dataIndex: "notification",
            width: "80%",
            render: (_, record) => (
              <div className="flex lg:text-[15px] items-center">
                {
                  record.isRead ? <SVGIcon icon={GreenBillIcon} /> : <SVGIcon icon={BlackBillIcon} />
                }
                <span className="text-[#E9463A] ml-3">{record.notification.companyName}</span>
                <span className="ml-1">{record.notification.message}</span>
                <span className="ml-1 text-[#E9463A]">{record.notification.name}</span>
              </div>
            ),
          },
          {
            title: "Date",
            dataIndex: "date",
            align: "center",
          },
        ]}
        dataSource={[
          {
            isRead : false,
            notification: {
              companyName: "Walla",
              message: "company wants to ask for additional expert",
              name: "Jackson holder",
            },
            date: "06-15-2022",
          },
          {
            isRead : true,
            notification: {
              companyName: "Rolly Rolson",
              message: "want to create an account as an",
              name: "Expert user",
            },
            date: "06-15-2022",
          },
          {
            isRead: false,
            notification: {
              companyName: "Sezuka Oner",
              message: "want to create an account as a",
              name: "Business user",
            },
            date: "06-15-2022",
          },
          {
            isRead : true,
            notification: {
              companyName: "Walla",
              message: "company wants to ask for additional expert",
              name: "Jackson holder",
            },
            date: "06-15-2022",
          },
          {
            isRead : true,
            notification: {
              companyName: "Rolly Rolson",
              message: "want to create an account as an",
              name: "Expert user",
            },
            date: "06-15-2022",
          },
          {
            isRead : false,
            notification: {
              companyName: "Sezuka Oner",
              message: "want to create an account as a",
              name: "Business user",
            },
            date: "06-15-2022",
          },
        ]}
        pagination = {{position : ['bottomCenter']}}
      />
    </div>
  );
}

export default AdminNotifications;
