import React, { useEffect, useState } from "react";
import {
  fetchFeedbackData,
  Feedback,
} from "../../store/adminFeedback/adminFeedback";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/root-store";
import TableComponent from "../../common-components/Table/table";
import ButtonComp from "../../common-components/button";
import SVGIcon from "../../common-components/SVgicon";
import { Modals } from "../../common-components/modal";
import ReplyModal from "./ReplyModal";
import { baseUrl } from "../../api/base-api";
const ViewIcon = () => {
  return (
    <>
      <SVGIcon
        hoverColor="white"
        icon={[
          {
            d: "M5.87764 0C8.30523 0.0913739 10.2384 1.10267 11.6461 3.101C11.7498 3.24806 11.7432 3.34847 11.6423 3.49315C10.3997 5.26875 8.71356 6.32431 6.55247 6.52371C3.82506 6.77547 1.68634 5.69945 0.0849162 3.50267C-0.0312047 3.34324 -0.0264457 3.23616 0.0882476 3.07292C1.32513 1.3135 3.00269 0.303152 5.13951 0.0513978C5.38413 0.0223676 5.62779 0.00285543 5.87764 0ZM5.87954 1.19928C4.74546 1.19738 3.7689 2.15252 3.76557 3.26614C3.76224 4.40355 4.71453 5.38297 5.82624 5.38487C6.98269 5.38678 7.94878 4.44258 7.95164 3.30754C7.95402 2.17727 6.99507 1.20119 5.87954 1.19928Z",
            fill: "#3A0F7D",
          },
        ]}
        width={12}
        height={12}
        className="mt-[7px] mr-2 hover:text-white"
      />
    </>
  );
};

const AdminFeedback: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<Feedback | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] =
    useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  //fetching Feedback api data
  useEffect(() => {
    dispatch(fetchFeedbackData());
  }, [dispatch]);
  const feedbackData = useSelector(
    (state: RootState) => state.feedbackData.feedback
  );
  const handlePreview = (item: Feedback) => {
    setSelectedUser(item);
    setIsFeedbackModalOpen(true);
  };
  const columns = [
    {
      title: "User",
      dataIndex: "users",
      key: "users",
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
    },
  ];
  //Mapping feedback data to display it is table component
  const data = feedbackData.map((item) => ({
    users: (
      <div className="flex items-center text-black text-md font-medium khula-text">
        <img  src={item.user_image ? `${baseUrl}${item.user_image}` : undefined} className="rounded-full h-10 w-10 mr-3" />
        {item.user_full_name}
      </div>
    ),
    actions: (
      <ButtonComp
        onClick={() => handlePreview(item)}
        text="Preview Details"
        className="h-12 w-40 text-[12px]"
        icon={<ViewIcon />}
      />
    ),
  }));

  return (
    <>
      <div className="mt-7 ml-5 w-full mr-5">
        <h2 className="text-[22px] text-[#CACACA] libre-caslon-text font-semibold mb-6">
          Feedback
        </h2>
        <div className="flex flex-row justify-between mb-3 mr-24">
          <h2 className="text-[#808080] text-[14px] font-medium ">User</h2>
          <h2 className="text-[#808080] text-[14px] font-medium">Action</h2>
        </div>

        <TableComponent
          columns={columns}
          data={data}
          showHeader={false}
          paginationEnabled={true}
        />

        {/*Feedback Modal  additional  information of feedback */}

        <Modals
          open={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          title="Feedback Details"
          width="450px"
        >
          {selectedUser && (
            <div className="mt-12 ">
              <div className="flex justify-center items-center">
                <img src={selectedUser?.user_image ?`${baseUrl}${selectedUser.user_image}` : undefined} className="h-[120px] w-[120px] rounded-full" />
              </div>
              <h2 className="text-[#808080] text-[14px] font-[600] ml-2 mt-6 mb-2">
                User Name
              </h2>
              <div className=" mt-2 pt-3 pl-4 w-full h-[49px] bg-[#EFEFEF] text-[14px] font-[400] text-black khula-text rounded-[8px]">
                {selectedUser.user_full_name}
              </div>
              <h2 className="text-[#808080] text-[14px] font-[600] ml-2 mt-4 mb-2">
                Email
              </h2>
              <div className=" mt-2 pt-3 pl-4 w-full h-[49px] bg-[#EFEFEF] text-[14px] font-[400] text-black khula-text rounded-[8px]">
                {selectedUser.user_email}
              </div>
              <h2 className="text-[#808080] text-[14px] font-[600] ml-2 mt-4 mb-2">
                Subject
              </h2>
              <div className=" mt-2 pt-3 pl-4 w-full h-[49px] bg-[#EFEFEF] text-[14px] font-[400] text-black khula-text rounded-[8px]">
                {selectedUser.subject}
              </div>
              <h2 className="text-[#808080] text-[14px] font-[600] ml-2 mt-4 mb-2">
                Details
              </h2>
              <div className=" mt-2 pt-3 pl-4 w-full  bg-[#EFEFEF] text-[14px] font-[400] text-black khula-text rounded-[8px]">
                {selectedUser.message}
              </div>
              <div className="flex-row mt-8 mb-10 justify-center items-center">
                <ButtonComp
                  text="Cancel"
                  size="medium"
                  className="ml-12 mr-5 h-[50px]"
                  onClick={() => setIsFeedbackModalOpen(false)}
                />
                <ButtonComp
                  text="Reply"
                  size="medium"
                  variant="violet"
                  className="h-[50px]"
                  onClick={() => setIsReplyModalOpen(true)}
                />
              </div>
            </div>
          )}
        </Modals>
        {/*Calling reply Modal */}
        <ReplyModal
          open={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          subject={selectedUser?.subject || ""}
          id={selectedUser?.id}
        />
      </div>
    </>
  );
};

export default AdminFeedback;
