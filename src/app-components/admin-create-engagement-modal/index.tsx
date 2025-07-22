import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modals } from "../../common-components/modal";
import InputComponent from "../../common-components/input";
import ButtonComp from "../../common-components/button";
import { Form } from "antd";
import {
  EngagementType,
  createEngagement,
} from "../../store/adminCreateEngagements";
import { AppDispatch, RootState } from "../../store/root-store";
import { DatePicker } from "antd";
import {
    RegisteredUserType,
  getRegisteredUsers,
} from "../../store/allRegisteredUsers";
type props = {
  checkModal?: boolean;
  closeModal?: () => void;
};

export const AdminCreateEngagementModal: React.FC<props> = ({
  checkModal,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();

  //fetching registered users
  useEffect(() => {
    dispatch(getRegisteredUsers());
  }, [dispatch]);

  //fetching users from store
  const registeredUsers:RegisteredUserType[] | undefined= useSelector(
    (state: RootState) => state.allRegisteredUsers.registeredUsers
  );

  //creating new engagement
  const onFinish = (values: EngagementType) => {
    values.expert = registeredUsers?.filter((user) =>
      user.username != null && user.user_choices == "expert"
        ? user.username == values.expert.toString()
        : ""
    )[0]
      ? (registeredUsers?.filter(
          (user) => user.username == values.expert.toString()
        )[0]).id
      : 0;
    values.is_active = true;
    values.ongoing = false;
    values.hours = +values.hours;
    values.rate = +values.rate;
    values.weekly_commitment = +values.weekly_commitment;
    values.start_date =
      typeof values.start_date === "string"
        ? values.start_date
        : values.start_date.format("YYYY-MM-DD");
    dispatch(createEngagement(values));
    closeModal?.();
  };

  return (
    <>
      <div>
        <Modals
          title="Create Engagement"
          open={checkModal}
          onClose={closeModal}
          width="1200px"
          className="libre-caslon-text flex justify-center items-center"
        >
          <Form onFinish={onFinish} form={form} className="max-sm:w-[250px]">
            <div className="mt-5">
              <Form.Item name="name">
                <InputComponent
                  type="text"
                  label="Engagement Name"
                  name="name"
                  placeholder="Enter Engagement Name..."
                />
              </Form.Item>
            </div>
            <div className="mt-5">
              <Form.Item name="expert">
                <InputComponent
                  type="text"
                  label="Expert Name"
                  name="expert"
                  placeholder="Enter Expert Name"
                />
              </Form.Item>
            </div>
            <div className="flex space-x-20">
              <div className="mt-5 flex items-center">
                <Form.Item name="rate" rules={[{ required: true }]}>
                  <InputComponent
                    className="w-10"
                    type="text"
                    label="Expert Hourly Rate"
                    name="rate"
                    placeholder="Rate"
                  />
                </Form.Item>
                <p>/hr</p>
              </div>
              <div className="mt-5 flex items-center">
                <Form.Item name="hours" rules={[{ required: true }]}>
                  <InputComponent
                    className="w-10"
                    type="text"
                    label="Required Hours"
                    name="hours"
                    placeholder="Rate"
                  />
                </Form.Item>
                <p>/hr</p>
              </div>
            </div>
            <div className="mt-5 flex items-center">
              <Form.Item name="weekly_commitment" rules={[{ required: true }]}>
                <InputComponent
                  className="w-32"
                  type="text"
                  label="Weekly Commitment"
                  name="weekly_commitment"
                  placeholder="Weekly Commitment"
                />
              </Form.Item>
              <p>/hr</p>
            </div>
            <div className="mt-5">
              <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[8px] text-[#808080] khula-text font-semibold leading-normal mb-2">
                Engagement Start Date
              </label>
              <Form.Item name="start_date" rules={[{ required: true }]}>
                <DatePicker
                  format="YYYY-MM-DD"
                  className="w-full mt-2 h-12 "
                  style={{ borderColor: "#808080" }}
                />
              </Form.Item>
            </div>
            <div className="mt-5">
              <Form.Item name="description" rules={[{ required: true }]}>
                <InputComponent
                  type="textarea"
                  label="Description"
                  name="description"
                  placeholder="Type here..."
                  rows={5}
                />
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
