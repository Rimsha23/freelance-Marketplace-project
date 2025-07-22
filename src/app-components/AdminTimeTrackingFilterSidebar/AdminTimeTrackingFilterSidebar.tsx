import { Button, DatePicker, Form, Input } from "antd";
import React from "react";
import { searchInputType } from "../../pages/Time Tracking-Admin/TimerackingAdmin";

type adminTimeTrackingFilterSidebarPropsTypes = {
  filterSidebarIsOpen: boolean;
  setSearchInput: React.Dispatch<React.SetStateAction<searchInputType | null>>;
  setFilterSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function AdminTimeTrackingFilterSidebar({
  filterSidebarIsOpen,
  setSearchInput,
  setFilterSidebarIsOpen,
}: adminTimeTrackingFilterSidebarPropsTypes) {
  const onFinish = (values: any) => {
    setSearchInput(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className={`w-[326px] px-3 right-0 top-14 bg-white shadow-md border z-30 rounded-md khula-text ${
        filterSidebarIsOpen ? "absolute" : "hidden"
      }`}
    >
      <Form
        className="mt-5"
        name="myForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <label className="text-[#808080] text-base font-semibold">
          Client Name
        </label>
        <Form.Item
          name="clientName"
          rules={[{ required: true, message: "Please enter Client Name!" }]}
        >
          <Input className="h-12 mt-2" placeholder="Type client name" />
        </Form.Item>
        <label className="text-[#808080] text-base font-semibold">
          Expert Name
        </label>
        <Form.Item
          name="expertName"
          rules={[{ required: true, message: "Please enter Expert Name!" }]}
        >
          <Input className="h-12 mt-2" placeholder="Type Expert name" />
        </Form.Item>
        <label className="text-[#808080] text-base font-semibold">Date</label>
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Please select a date!" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            className="h-12 mt-2"
            placeholder="Type Date"
          />
        </Form.Item>

        <Form.Item className="flex justify-center mt-8">
          <Button
            className="w-[115px] h-10"
            shape="round"
            onClick={() => {
              setFilterSidebarIsOpen(false);
            }}
          >
            Clear
          </Button>
          <Button
            htmlType="submit"
            className="w-[115px] h-10 text-[#3A0F7D] font-bold border-1 border-[#3A0F7D] ml-3"
            shape="round"
          >
            Apply
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminTimeTrackingFilterSidebar;
