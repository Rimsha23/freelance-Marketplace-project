import { Button, DatePicker, Select } from "antd";
import InputComponent from "../../common-components/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/root-store";
import {
  LogHoursData,
  addTime,
  useGetEngagementQuery,
} from "../../store/TimeTracker/TimeTrackingSlice";
import { Form } from "antd";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Option } from "antd/es/mentions";
import { engagementsApiDataType } from "../../utils/DataTypesAndInterface";

// Types=====>

type FieldType = {
  engagements: string;
  hours?: number;
  description?: string;
  minutes?: number;
  date?: string;
};

export type valuesType = {
  user?: string;
  engagements: string;
  hours: number;
  minutes: number;
  description: string;
  date_time: string;
};

function TimeTracker() {
  // Hooks ====>
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const { data } = useGetEngagementQuery();

  // Functions ====>

  useEffect(() => {
    dispatch(LogHoursData());
  }, [dispatch]);

  const onFinish = async (values: valuesType) => {
    const selectedEngagement = values.engagements;
    const EngAndUserId = data.find(
      (eng: engagementsApiDataType) => eng.name === selectedEngagement
    )?.id;
    const obj = {
      engagement: EngAndUserId,
      date_time: selectDate,
      hours: values.hours,
      minutes: values.minutes,
      description: values.description,
      user: EngAndUserId,
    };
    console.log(obj);
    await dispatch(addTime(obj as unknown as valuesType));
    navigate("/loghours");
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<valuesType>) => {
    console.log("Failed:", errorInfo);
  };

  const handleDateChange = (
    _date: any,
    dateString: SetStateAction<string | null>
  ) => {
    console.log(dateString);
    setSelectDate(dateString);
  };

  return (
    <div className="md:w-[1073px] w-full mt-[39px] md:mx-[45px] px-1 md:px-0">
      <h1 className="libre-caslon-text text-[22px] text-[#CACACA] font-bold">
        Time Tracker
      </h1>
      <div className="py-[30px] mt-[19px] md:px-[36px] px-2 border bg-white">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="flex flex-col space-y-[31px] overflow-hidden"
        >
          <div className="md:flex">
            <Form.Item<FieldType>
              name="engagements"
              className="w-96 "
              rules={[
                {
                  required: false,
                  message: "Please input your engagements!",
                },
              ]}
            >
              <label className="font-semibold text-[#808080] khula-text">
                Engagements
              </label>
              <Select placeholder="Engagements" className=" h-14 mt-2 border border-gray-500 rounded-md">
                {data?.map((eng: engagementsApiDataType) => (
                  <Option key={eng.name} value={eng.name}>
                    {eng.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div className="md:flex">
              <Form.Item<FieldType>
                name="hours"
                className="md:w-24 ml-7"
                rules={[
                  { required: true, message: "Please input your hours!" },
                ]}
              >
                <InputComponent placeholder="Hours" name="hours" label="Time" />
              </Form.Item>
              {/* </div> */}
              <p className="text-[#808080] khula-text font-semibold mt-11 md:ml-[10px] md:block hidden">
                Hour
              </p>
              <div className="md:ml-[17px] w-[89px] md:mt-[20px] mt-12">
                <Form.Item<FieldType>
                  name="minutes"
                  rules={[
                    { required: true, message: "Please input your minutes!" },
                  ]}
                >
                  <InputComponent placeholder="Minute" name="minutes " />
                </Form.Item>
              </div>
              <p className="text-[#808080] khula-text font-semibold mt-11 ml-[10px] md:block hidden">
                Minute
              </p>
            </div>
          </div>
          {/* <div className="md:w-[396px] h-12"> */}
          <Form.Item<FieldType>
            name="date"
            rules={[{ required: true, message: "Please input your date!" }]}
          >
            <DatePicker
              onChange={handleDateChange}
              className="md:w-[396px] h-14 py-4 border border-gray-500"
            />
          </Form.Item>
          {/* </div> */}
          <div className="w-full">
            <Form.Item<FieldType>
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <InputComponent
                type="textarea"
                label="Description"
                placeholder="What did you do?"
              />
            </Form.Item>
          </div>
          <Button
            htmlType="submit"
            className="w-[189px] h-[48px] flex justify-center items-center bg-[#3A0F7D] khula-text font-bold text-white text-base"
            shape="round"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default TimeTracker;
