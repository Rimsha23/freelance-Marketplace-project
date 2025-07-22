import { Button, Table, Modal } from "antd";
import { useState } from "react";
import {
  useGetAccountsQuery,
  useGetSelectedAccountQuery,
} from "../../store/ApproveAccounts/ApproveAccunts";
import { eyeIcon, resumeIcon } from "./ApproveAccountIcons";

function ApproveAccounts() {
  // Hooks ============
  const { data, isLoading } = useGetAccountsQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: selectedAccountData } = useGetSelectedAccountQuery(selectedId, {
    skip: selectedId === null,
  });

  // Funcitons============
  const handlePreviewClick = async (id: number) => {
    setSelectedId(id);
    setSelectedRecord(selectedAccountData);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleAcceptRequest = (id: number | null) => {
    console.log("Clicked.", id);
    setIsModalVisible(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:w-[1073px] mt-[39px] md:mx-[45px] px-1 md:px-0 khula-text">
      <div>
        <h1 className="libre-caslon-text text-[22px] text-[#CACACA] font-bold">
          Approve Accounts
        </h1>
      </div>
      <div className="w-[95%] mx-auto flex justify-between text-[#808080] font-semibold mt-7 py-3 khula-text text-sm">
        <h1>Experts</h1>
        <h1 className="mr-10">Actions</h1>
      </div>
      <Table
        columns={[
          {
            dataIndex: "full_name",
          },
          {
            align: "right", 
            render: (record) => (
              <Button
                icon={eyeIcon}
                type="link"
                className="md:w-[172px] md:h-[49px] md:mt-0 mt-3 font-bold border text-[#3A0F7D] border-[#3A0F7D]"
                shape="round"
                size="large"
                onClick={() => handlePreviewClick(record.id)}
              >
                Preview
              </Button>
            ),
          },
        ]}
        dataSource={data}
        showHeader={false}
        pagination={{ position: ["bottomCenter"] }}
      />
      <Modal
        title="Preview"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={1073}
      >
        {/* Render content of the modal using selectedRecord */}
        {selectedRecord && (
          <div className="w-[85%] mx-auto">
            <div className="flex justify-center items-center">
              <img
                src={selectedAccountData.image}
                width={192}
                alt="expert Dp"
                className="rounded-full"
              />
            </div>
            <div className="flex justify-between mt-5">
              <div>
                <h1>Full Name</h1>
                <div className="lg:w-96 md:w-56 bg-gray-300 py-4 pl-5 rounded-md mt-2">
                  <p>{selectedAccountData.full_name}</p>
                </div>
              </div>
              <div>
                <h1>LinkedIn Profile Link</h1>
                <div className="lg:w-96 md:w-56 bg-gray-300 py-4 pl-5 rounded-md mt-2">
                  <p>{selectedAccountData.linked_in_url}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <div>
                <h1>Email</h1>
                <div className="lg:w-96 md:w-56 bg-gray-300 py-4 pl-5 rounded-md mt-2">
                  <p>{selectedAccountData.email}</p>
                </div>
              </div>
              <div className="lg:w-96 md:w-56 flex flex-col justify-start">
                <h1>Hourly Rate</h1>
                <div className="w-20 bg-gray-300 py-4 pl-5 rounded-md mt-2">
                  <p>{selectedAccountData.hourly_rate}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <div>
                <h1>Resume</h1>
                <div className="lg:w-48 md:w-36 bg-gray-400 flex space-x-3 py-4 pl-5 rounded-md mt-2">
                  <span>{resumeIcon}</span>
                  <span>Filename.pdf</span>
                </div>
              </div>
              <div className="lg:w-96 md:w-56 flex flex-col justify-start">
                <h1>Area of Expertise</h1>
                <div className="flex space-x-3">
                  {selectedAccountData.area_of_expertise_names.map(
                    (skill: { id: number; name: string }) => (
                      <div
                        key={skill.id}
                        className="w-fit px-2 bg-gray-400 py-4 rounded-md mt-2"
                      >
                        <p>{skill.name}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <div>
                <h1>Weekly Availability</h1>
                <div className="lg:w-96 md:w-56 bg-gray-300 py-4 pl-5 rounded-md mt-2">
                  <p>
                    {selectedAccountData.weekly_availability_hours} hours per
                    week
                  </p>
                </div>
              </div>
              <div className="lg:w-96 md:w-56 flex flex-col justify-start">
                <h1>Industry Experience</h1>
                <div className="flex space-x-3">
                  {selectedAccountData.area_of_expertise_names.map(
                    (skill: { id: number; name: string }) => (
                      <div
                        key={skill.id}
                        className="w-fit px-2 bg-gray-400 py-4 rounded-md mt-2"
                      >
                        <p>{skill.name}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h1>Export Bio</h1>
              <div className="w-full py-4 pl-5 bg-gray-300 rounded-md mt-2">
                <p>{selectedAccountData.expert_description}</p>
              </div>
            </div>

            <div className="mt-16 flex space-x-3 justify-center">
              <Button
                onClick={() => setIsModalVisible(false)}
                className="w-[209px] h-14 border border-[#3A0F7D] text-[#3A0F7D] font-bold"
                shape="round"
              >
                Deny the Request
              </Button>
              <Button
                onClick={() => handleAcceptRequest(selectedAccountData.id)}
                className="w-[209px] h-14 border border-[#3A0F7D] font-bold bg-[#3A0F7D] text-white"
                shape="round"
              >
                Accept Request
              </Button>
            </div>

            <div className="mt-11 flex justify-center">
              <h1 className="border-b-2 border-[#3A0F7D] text-[#3A0F7D] font-bold w-fit cursor-pointer">
                Ask for rest of the information
              </h1>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ApproveAccounts;
