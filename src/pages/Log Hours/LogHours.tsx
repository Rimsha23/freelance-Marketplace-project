import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { exportExcel, filterIcon } from "./LogHoursIcons";
import LogHoursFilterSidebar from "../../app-components/LogHoursFilterSidebar/LogHoursFilterSidebar";
import { useDispatch, useSelector } from "react-redux";
import { LogHoursData } from "../../store/TimeTracker/TimeTrackingSlice";
import { AppDispatch } from "../../store/root-store";
import {
  LogHoursAndTimeTrackerApiType,
  sidebarFilterObjType,
} from "../../utils/DataTypesAndInterface";

const LogHours: React.FC = () => {
  // Hooks=========>

  const [filterData, setFilterData] = useState([]);
  const [filterSidebarIsOpen, setFilterSidebarIsOpen] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const logHoursData = useSelector((state) => state.loghours.data);
  const [searchBySidebarFilter, setSearchBySidebarFilter] =
    useState<sidebarFilterObjType | null>(null);

  // UseState Hook==========>

  useEffect(() => {
    dispatch(LogHoursData());
  }, [dispatch]);

  useEffect(() => {
    if (searchBySidebarFilter) {
      const filterData = logHoursData.filter(
        (log: LogHoursAndTimeTrackerApiType) =>
          log.user.full_name.toLowerCase().includes(searchBySidebarFilter.name)
      );
      setFilterData(filterData);
    } else setFilterData(logHoursData);
  }, [searchBySidebarFilter, logHoursData]);

  // Table Columns ===========>

  const columns = [
    {
      title: "Engagements",
      dataIndex: "engagement",
      key: "name",
      align: "center",
      render: (_text: string, record: { engagement: { name: string } }) =>
        record.engagement.name,
    },
    {
      title: "Client",
      dataIndex: "user",
      key: "full_name",
      align: "center",
      render: (_text: string, record: { user: { full_name: string } }) =>
        record.user.full_name,
    },
    {
      title: "Date",
      dataIndex: "date_time",
      align: "center",
      render: (text: string | any[]) => text.slice(0, 10),
    },
    {
      title: "Time",
      dataIndex: "time",
      align: "center",
      render: (_text: string, record: { hours: number; minutes: number }) =>
        `${record.hours} hours ${record.minutes} minutes`,
    },
  ];

  // fucntions========>
  return (
    <div className="d:w-[1073px] w-full mt-[39px] md:mx-[45px] px-1 md:px-0">
      <div className="md:flex justify-between">
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
            onClick={() => setFilterSidebarIsOpen(true)}
            icon={filterIcon}
            shape="round"
            className="md:h-[42px] lg:w-[109px] flex items-center justify-center border-[1px] bg-white text-sm font-bold text-[#3A0F7D] border-blue-700"
          >
            Filter
          </Button>
        </div>
      </div>
      <div className="mt-[27px]">
        <Table
          columns={columns}
          dataSource={filterData}
          pagination={{ position: ["bottomCenter"] }}
        />
      </div>
      <LogHoursFilterSidebar
        filterSidebarIsOpen={filterSidebarIsOpen}
        setFilterSidebarIsOpen={setFilterSidebarIsOpen}
        setSearchBySidebarFilter={setSearchBySidebarFilter}
        searchBySidebarFilter={searchBySidebarFilter}
      />
    </div>
  );
};

export default LogHours;
