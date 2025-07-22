import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modals } from "../../common-components/modal";
import InputComponent from "../../common-components/input";
import ButtonComp from "../../common-components/button";
import { Form, Select } from "antd";
import { sendExtraHoursRequest } from "../../store/expertActiveEngagements";
import { AppDispatch, RootState } from "../../store/root-store";
import { getRegisteredUsers } from "../../store/allRegisteredUsers";

type props = {
  businessName?: string;
  engagementName?: string;
  engagementId?: number;
  checkModal?: boolean;
  closeModal?: () => void;
};

export const ExpertRequestHoursModal: React.FC<props> = ({
  businessName,
  engagementName,
  engagementId,
  checkModal,
  closeModal,
}) => {
  type RequstedHoursProps = {
    id: number;
    hours_to_increase: number;
    request_description: string;
    ongoing_engagement: string;
    user: number;
    engagement: number;
  };

  const [form] = Form.useForm();
  const { Option } = Select;

  const dispatch: AppDispatch = useDispatch();
  //fetching registered users
  useEffect(() => {
    dispatch(getRegisteredUsers());
  }, [dispatch]);

  //fetching registered users
  const registeredUsers = useSelector(
    (state: RootState) => state.allRegisteredUsers.registeredUsers
  );

  //posting request for extra hours
  const onFinish = (values: RequstedHoursProps) => {
    values.engagement = engagementId ? engagementId : 0;
    values.hours_to_increase = + (values.hours_to_increase)
    values.user =
      registeredUsers?.filter(
        (user) =>
          user.email == businessName && user.user_choices == "business"
      )[0]?.id ?? 0;
    console.log(values)
    dispatch(sendExtraHoursRequest(values));
    closeModal?.();
  };

  return (
    <>
      <div>
        <Modals
          title="Request Hours"
          open={checkModal}
          onClose={closeModal}
          className="libre-caslon-text flex justify-center items-center"
        >
          <Form onFinish={onFinish} form={form} className="max-sm:w-[250px]">
            <div className="mt-[28px]">
              <Form.Item name="user">
                <InputComponent
                  type="text"
                  label="Name of Client"
                  name="user"
                  isDisabled={true}
                  defaultValue={businessName}
                  placeholder="Enter your name..."
                />
              </Form.Item>
            </div>
            <div className="mt-[28px]">
              <Form.Item name="engagement">
                <InputComponent
                  type="text"
                  label="Engagement"
                  name="engagement"
                  isDisabled={true}
                  defaultValue={engagementName}
                  placeholder="Enter Engagement Name"
                />
              </Form.Item>
            </div>
            <div className="mt-[28px] flex items-center">
              <Form.Item name="hours_to_increase" rules={[{ required: true }]}>
                <InputComponent
                  className="w-32"
                  type="text"
                  label="Amount of hour to increase"
                  name="hours_to_increase"
                  placeholder="00"
                />
              </Form.Item>
              <p className="-ml-10">/hr</p>
            </div>
            <div className="mt-[28px]">
              <Form.Item
                name="request_description"
                rules={[{ required: true }]}
              >
                <InputComponent
                  type="textarea"
                  label="Description"
                  name="request_description"
                  placeholder="Type here..."
                  rows={5}
                />
              </Form.Item>
            </div>
            <div className="mt-[33px]">
              <label className="text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal mb-2">
                Ongoing Engagement
              </label>
              <Form.Item name="ongoing_engagement" rules={[{ required: true }]}>
                <Select
                  className="border-[1px] border-[#808080] h-[55px] rounded-[8px] bg-[#FFF] text-[14px] font-normal khula-text"
                  placeholder="Select"
                  allowClear
                >
                  <Option key="daily" value="daily">
                    Daily
                  </Option>
                  <Option key="weekly" value="weekly">
                    Weekly
                  </Option>
                </Select>
              </Form.Item>
            </div>
            <div className="my-[48px] flex justify-center">
              <ButtonComp
                className="shadow-none max-sm:w-[40px]"
                text="Cancel"
                onClick={closeModal}
              />
              <ButtonComp
                className="shadow-none ml-[17px] max-sm:w-[40px]"
                variant="violet"
                text="Suggest"
                htmlType="submit"
              />
            </div>
          </Form>
        </Modals>
      </div>
    </>
  );
};
