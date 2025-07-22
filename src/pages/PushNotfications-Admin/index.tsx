import React, { useEffect, useState } from "react";
import ButtonComp from "../../common-components/button";
import TableComponent from "../../common-components/Table/table";
import SVGIcon from "../../common-components/SVgicon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/root-store";
import {
  fetchAdminNotification,
  AdminNotificationState,
  deleteAdminNotification,
  AdminNotification,
} from "../../store/pushNotification/pushNotificationSlice";
import CreateNotificationModal from "./createNotificationModal";
import EditNotificationModal from "./EditNotificationModal";
const DeleteIcon = () => {
  const deleteIcon = [
    {
      d: "M4.99336 1.50217C6.4747 1.50217 7.95642 1.50104 9.43776 1.50292C9.78596 1.50329 9.99195 1.6909 9.9927 1.99632C9.99345 2.27023 9.80847 2.47772 9.53457 2.4886C9.25991 2.49948 8.98413 2.50324 8.70985 2.49048C8.53988 2.4826 8.48922 2.531 8.48997 2.7066C8.49635 4.61306 8.49035 6.5199 8.49635 8.42636C8.49823 8.96592 8.30462 9.39891 7.87237 9.72047C7.60822 9.91708 7.30692 10 6.97749 9.99925C5.65861 9.997 4.33936 10.0038 3.02048 9.99663C2.12034 9.99175 1.50162 9.35989 1.49974 8.45075C1.49599 6.53791 1.49674 4.62507 1.50199 2.71223C1.50237 2.54714 1.46935 2.4766 1.28812 2.49048C1.0705 2.50699 0.850997 2.49461 0.631872 2.49423C0.213884 2.49348 0.00188837 2.32839 1.23006e-05 2.00233C-0.00186377 1.67364 0.210882 1.50254 0.623993 1.50254C2.08057 1.50179 3.53715 1.50217 4.99336 1.50217ZM3.49588 5.74996C3.49588 6.14994 3.49438 6.54991 3.49625 6.94989C3.49813 7.2662 3.703 7.49433 3.98703 7.50221C4.26769 7.51009 4.49432 7.28834 4.49732 6.96865C4.5052 6.15632 4.5052 5.3436 4.49732 4.53089C4.49432 4.21121 4.26769 3.98946 3.98703 3.99734C3.70225 4.00559 3.49813 4.2326 3.49625 4.54928C3.494 4.95 3.49588 5.34998 3.49588 5.74996ZM6.49721 5.74996C6.49721 5.35599 6.49834 4.96239 6.49684 4.56841C6.49571 4.2356 6.29685 4.00597 6.00568 3.99771C5.71902 3.98946 5.49652 4.21984 5.49427 4.55003C5.48901 5.34998 5.49164 6.15031 5.49352 6.95027C5.49389 7.08985 5.52653 7.22267 5.62334 7.33148C5.75692 7.48082 5.97416 7.5356 6.1704 7.46844C6.35913 7.4039 6.49308 7.21442 6.49534 6.98779C6.50021 6.57505 6.49721 6.16269 6.49721 5.74996Z",
      fill: "#3A0F7D",
    },
    {
      d: "M4.99697 0.993003C4.67803 0.993003 4.3591 0.996005 4.04017 0.992253C3.71111 0.9885 3.49911 0.79414 3.49611 0.501848C3.49386 0.208431 3.70586 0.00469017 4.03079 0.0028141C4.67503 -0.000938034 5.3189 -0.000938034 5.96314 0.0028141C6.28808 0.00469017 6.50045 0.208806 6.49782 0.501848C6.49519 0.79414 6.28282 0.9885 5.95376 0.992253C5.6352 0.996005 5.3159 0.993003 4.99697 0.993003Z",
      fill: "#3A0F7D",
    },
  ];
  return (
    <>
      <SVGIcon
        hoverColor="white"
        icon={deleteIcon}
        width={12}
        height={12}
        className=" mt-[5px] mr-1 hover:text-white"
      />
    </>
  );
};
const EditIcon = () => {
  const editIcon = [
    {
      d: "M0.949199 8.99951C0.667956 8.99951 0.386714 8.99726 0.105752 9.00092C0.0289725 9.00204 0.000285692 8.98376 0.000566935 8.90052C0.00394185 8.33353 0.00450434 7.76654 4.4492e-06 7.19956C-0.000558037 7.11378 0.0523156 7.0744 0.100408 7.02659C1.29569 5.83019 2.49182 4.63462 3.68766 3.43878C4.27405 2.85238 4.86213 2.26796 5.44459 1.67791C5.5208 1.60057 5.55737 1.6062 5.62993 1.67932C6.19326 2.24884 6.75968 2.81554 7.32948 3.37859C7.40232 3.45059 7.39416 3.48602 7.32667 3.55324C5.53599 5.34026 3.74757 7.12925 1.95999 8.91936C1.90289 8.97645 1.84665 9.00289 1.76452 9.00148C1.49284 8.99642 1.22088 8.99951 0.949199 8.99951Z",
      fill: "#3A0F7D",
    },
    {
      d: "M7.31325 8.91824e-06C7.47665 -0.000834811 7.60096 0.0582262 7.70418 0.161161C8.08273 0.538027 8.46297 0.913486 8.83674 1.29513C9.06343 1.52688 9.05949 1.81234 8.83309 2.04268C8.56056 2.31998 8.28241 2.59166 8.01045 2.86953C7.95336 2.92775 7.92102 2.92212 7.86618 2.867C7.2916 2.28876 6.71561 1.71222 6.13681 1.13848C6.07353 1.07576 6.07944 1.04258 6.13906 0.984078C6.41693 0.712116 6.6903 0.435654 6.96507 0.160599C7.06548 0.0601949 7.18557 0.00479005 7.31325 8.91824e-06Z",
      fill: "#3A0F7D",
    },
  ];
  return (
    <>
      <SVGIcon
        hoverColor="white"
        icon={editIcon}
        width={9}
        height={9}
        className=" mt-[5px] mr-1 hover:text-white"
      />
    </>
  );
};
const PushNotification: React.FC = () => {
  const [isCreateNotificationModalVisible, setCreateNotificationModalVisible] =
    useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] =
    useState<AdminNotification>({
      Notification_name: "",
      sent_to: [],
      activation_time: "",
    });
  const [isEditNotificationModalVisible, setEditNotificationModalVisible] =
    useState<boolean>(false);

  useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    console.log("Before dispatch:", adminNotification);
    dispatch(fetchAdminNotification());
    console.log("After dispatch:", adminNotification);
  }, [dispatch]);

  const adminNotification = useSelector(
    (state: { pushNotifications: AdminNotificationState }) =>
      state.pushNotifications.adminNotification
  );
  console.log(adminNotification);
  const columns = [
    {
      title: "Notifications Name",
      dataIndex: "notificationName",
      key: "notificationName",
    },
    {
      title: "Activation Time",
      dataIndex: "activationTime",
      key: "activationTime",
    },
    {
      title: "Sent To",
      dataIndex: "sentTo",
      key: "sentTo",
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const data = adminNotification.map((e) => ({
    notificationName: (
      <div className=" w-32 text-black text-[13px] font-medium khula-text">
        {e.Notification_name.substring(0, 20)}...
      </div>
    ),
    activationTime: (
      <div className=" w-28 text-black text-[13px] font-medium khula-text">
        {e.activation_time.substring(0, 10)}{" "}
        {e.activation_time.substring(12, 16)}
      </div>
    ),
    sentTo: (
      <div className=" w-28 text-black text-[13px] font-medium khula-text">
        {e.sent_to.join(",").slice(0, 15)}...
      </div>
    ),
    actions: (
      <div className="flex flex-row">
        <ButtonComp
          text="Edit"
          size="small"
          icon={<EditIcon />}
          className="text-[11px] mr-1 "
          onClick={() => {
            console.log("Edit button clicked");
            setSelectedNotification(e);
            setEditNotificationModalVisible(true);
          }}
        />

        <ButtonComp
          text="Delete"
          size="small"
          icon={<DeleteIcon />}
          className="text-[11px] "
          onClick={() => {
            console.log("Delete button clicked");
            dispatch(deleteAdminNotification(e.id));
          }}
        />
      </div>
    ),
  }));

  return (
    <>
      <div className="absolute">
        <CreateNotificationModal
          isOpen={isCreateNotificationModalVisible}
          onClose={() => setCreateNotificationModalVisible(false)}
        />
        <EditNotificationModal
          isOpen={isEditNotificationModalVisible}
          onClose={() => {
            setEditNotificationModalVisible(false);
            setSelectedNotification({
              Notification_name: "",
              sent_to: [],
              activation_time: "",
            });
          }}
          notificationData={selectedNotification}
        />
      </div>
      <div className="flex w-full">
        <div className="flex-col ml-10 mr-10 w-full">
          <div className=" flex flex-row justify-between mb-10 mt-2    items-center ">
            <h1 className="text-[22px] mt-6 text-[#CACACA] libre-caslon-text font-semibold mb-6">
              Push Notifications
            </h1>
            <div className="flex-row  ">
              <ButtonComp
                text="+ Create Notification"
                className="w-44 mb-2 mr-2 h-10"
                onClick={() => setCreateNotificationModalVisible(true)}
              />
            </div>
          </div>
          <div className="pr-[68px] pl-[24px] lg:flex  md:flex justify-between text-[#808080] pb-[16px] text-[14px] font-khula font-semibold">
            <div>Notification Name</div>
            <div className="pr-[40px]">Activation Time</div>
            <div className="pr-[150px]">Sent To</div>
            <div className="">Actions</div>
          </div>
          <TableComponent
            columns={columns}
            data={data}
            showHeader={false}
            paginationEnabled={true}
          />
        </div>
      </div>
    </>
  );
};
export default PushNotification;
