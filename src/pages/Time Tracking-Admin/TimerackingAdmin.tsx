import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Modal,
  Switch,
  Table,
} from "antd";
import { exportExcel, filterIcon } from "../Log Hours/LogHoursIcons";
import BillingPeriod from "../../app-components/Billing Period/BillingPeriod";
import { useGetAdminTimeTrackingDataQuery } from "../../store/ApproveAccounts/ApproveAccunts";
import { DotsIcon, PensilIcons } from "./Icons";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import AdminTimeTrackingFilterSidebar from "../../app-components/AdminTimeTrackingFilterSidebar/AdminTimeTrackingFilterSidebar";

export type searchInputType = {
  clientName : string;
  expertName : string;
  data? : unknown;
}

function TimeTrackingAdmin() {
  // Hoooks============

  var { data: timetrackingData } = useGetAdminTimeTrackingDataQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [_selectedRecord, setSelectedRecord] = useState(null);
  const [filterSidebarIsOpen, setFilterSidebarIsOpen] =
    useState<boolean>(false);
  const [searchInput , setSearchInput] = useState<searchInputType | null>(null)
  const [filterData , setFilterData] = useState()
  // functions===========

  const handleModalButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if(searchInput) {
      setFilterData(timetrackingData.filter((row: { time_track: { user: { full_name: string; }; }; }) => row.time_track.user.full_name.toLowerCase().includes(searchInput.clientName)))
    }else{
      setFilterData(timetrackingData)
    }
  }, [searchInput, timetrackingData])

  // Other=============
  const menu = (
    <Menu>
      <Button
        icon={PensilIcons}
        type="link"
        className=" font-bold text-[#3A0F7D]"
        onClick={handleModalButtonClick}
      >
        Edit Tracking Details
      </Button>
    </Menu>
  );

  return (
    <div className="d:w-[1073px] w-full mt-[39px] md:mx-[45px] px-1 md:px-0 khula-text">
      <div className="md:flex justify-between relative">
        <h1 className="libre-caslon-text text-[22px] text-[#CACACA] font-bold">
          Log History
        </h1>
        <div className="lg:flex flex justify-center space-x-3 items-center">
          <Button
            icon={exportExcel}
            shape="round"
            className="md:h-[42px] lg:w-[220px] flex items-center justify-center border-[1px] bg-white text-sm text-[#3A0F7D] border-blue-700 font-bold"
          >
            Expport Excel, CSV
          </Button>
          <Button
            icon={filterIcon}
            onClick={() => setFilterSidebarIsOpen(!filterSidebarIsOpen)}
            shape="round"
            className="md:h-[42px] lg:w-[109px] flex items-center justify-center border-[1px] bg-white text-sm font-bold text-[#3A0F7D] border-blue-700"
          >
            Filter
          </Button>
        </div>

        <AdminTimeTrackingFilterSidebar filterSidebarIsOpen={filterSidebarIsOpen} setSearchInput={setSearchInput} setFilterSidebarIsOpen={setFilterSidebarIsOpen} />
        
      </div>
      <BillingPeriod />
      <div className="mt-7">
        <Table
          columns={[
            {
              title: "Client",
              dataIndex: "time_track",
              width: "12.5%",
              render: (record) => record.user.full_name,
            },
            {
              title: "Expert",
              dataIndex: "time_track",
              width: "12.5%",
              render: (record) => record.engagement.created_by,
            },
            {
              title: "Engagement",
              dataIndex: "time_track",
              width: "12.5%",
              render: (record) => record.engagement.name,
            },
            {
              title: "Billing Period",
              dataIndex: "date_time",
              width: "12.5%",
              render: (text) => text.slice(0, 10),
            },
            {
              title: "No. of Hours",
              dataIndex: "time_track",
              width: "12.5%",
              render: (record) => <span>{record.hours} hours</span>,
            },
            {
              title: "Invoice Rate & Invoice Amount",
              width: "12.5%",
              dataIndex: "inovice_rate_and_amount",
            },
            {
              title: "Payment Rate & Payment Amount",
              width: "12%",
              dataIndex: "clientName",
            },
            {
              title: "Actions",
              width: "12%",
              align: "end",
              render: (record) => (
                <Dropdown overlay={menu}>
                  <Button type="link" onClick={() => setSelectedRecord(record)}>
                    {DotsIcon}
                  </Button>
                </Dropdown>
              ),
            },
          ]}
          dataSource={filterData}
          pagination={{ position: ["bottomCenter"] }}
        />
      </div>
      <Modal
        className="khula-text"
        width={483}
        footer={null}
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
        <h1 className="text-[#CACACA] font-bold text-2xl libre-caslon-text">
          Edit Tracking Details
        </h1>
        <div className="mt-12">
          <p className="text-[#808080] font-semibold">Engagement Title</p>
          <div className=" py-3 px-5 bg-gray-300 rounded-md mt-2">
            <p>Need some improvement in time tracker</p>
          </div>
        </div>

        <div className="mt-7">
          <p className="text-[#808080] font-semibold">Date</p>
          <DatePicker className="w-full mt-2 h-12" />
        </div>

        <div className="mt-7">
          <p className="text-[#808080] font-semibold">Time</p>
          <div className="mt-2 flex space-x-3 items-center">
            <Input className="h-12 w-20" />
            <span className="text-[#808080] text-sm font-semibold">Hours</span>
            <Input className="h-12 w-20" />
            <span className="text-[#808080] text-sm font-semibold">Minute</span>
          </div>
        </div>

        <div className="mt-7">
          <p className="text-[#808080] font-semibold">
            Description of Engagement
          </p>
          <TextArea rows={5} className="w-full mt-2" />
        </div>
        <div className="flex mt-7 justify-between">
          <p className="text-[#808080] font-semibold">Auto-Time Lock</p>
          <div>
            <Switch /> <span className=" font-semibold">on</span>
          </div>
        </div>
        <div className="flex justify-center mt-10 space-x-3">
          <Button className="w-32 h-12 font-bold" shape="round">
            Cancel
          </Button>
          <Button
            type="primary"
            className="w-32 h-12 bg-[#3A0F7D] text-white font-bold"
            shape="round"
          >
            Save Changes
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default TimeTrackingAdmin;
