import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modals } from "../../common-components/modal";
import InputComponent from "../../common-components/input";
import ButtonComp from "../../common-components/button";
import { Form, Select } from "antd";
import {
  ExpertiseType,
  getExpertiseList,
  getSuggestion,
  postSuggestion,
  SuggestionType,
} from "../../store/expertEngagements";
import { AppDispatch, RootState } from "../../store/root-store";
import {
  RegisteredUserType,
  getRegisteredUsers,
} from "../../store/allRegisteredUsers";

type props = {
  checkModal?: boolean;
  closeModal?: () => void;
};

export const GrowTeamModal: React.FC<props> = ({ checkModal, closeModal }) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const dispatch: AppDispatch = useDispatch();

  //posting suggestion
  const onFinish = (values: SuggestionType) => {
    dispatch(postSuggestion(values));
    closeModal?.();
  };

  //fetching suggestions
  useEffect(() => {
    dispatch(getSuggestion());
  }, [dispatch]);

  //fetching registered users
  useEffect(() => {
    dispatch(getRegisteredUsers());
  }, [dispatch]);

  const registeredUsers = useSelector(
    (state: RootState) => state.allRegisteredUsers.registeredUsers
  );

  //fetching expertise list
  useEffect(() => {
    dispatch(getExpertiseList());
  }, [dispatch]);

  const expertiseList = useSelector(
    (state: RootState) => state.expertEngagements.expertiseList
  );

  return (
    <>
      <div>
        <Modals
          title="Grow Your Team"
          open={checkModal}
          onClose={closeModal}
          className="libre-caslon-text flex justify-center items-center"
        >
          <Form onFinish={onFinish} form={form} className="max-sm:w-[250px]">
            <p className="max-w-full text-left khula-text mt-[15px]">
              Does your client need additional marketing expertise, let us know
              here!
            </p>
            <div className="mt-[33px]">
              <label className="text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal mb-2">
                List of Clients
              </label>
              <Form.Item name="client" rules={[{ required: true }]}>
                <Select
                  className="border-[1px] border-[#808080] h-[55px] rounded-[8px] bg-[#FFF] text-[14px] font-normal khula-text"
                  placeholder="Select Client"
                  allowClear
                >
                  {registeredUsers &&
                    registeredUsers.map((user: RegisteredUserType) =>
                      user.user_choices == "business" ? (
                        <Option key={user?.id} value={user?.id}>
                          {user?.username}
                        </Option>
                      ) : (
                        ""
                      )
                    )}
                </Select>
              </Form.Item>
            </div>
            <div className="mt-[28px]">
              <label className="text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal mb-2">
                Expert Area
              </label>
              <Form.Item name="area_of_expertisee" rules={[{ required: true }]}>
                <Select
                  className="border-[1px] border-[#808080] h-[55px] rounded-[8px] bg-[#FFF] text-[14px] font-normal khula-text"
                  placeholder="Expertise Needed"
                  allowClear
                >
                  {expertiseList &&
                    expertiseList.map((expertise: ExpertiseType) => (
                      <Option key={expertise?.id} value={expertise?.name}>
                        {expertise?.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
            <div className="mt-[28px]">
              <Form.Item name="description" rules={[{ required: true }]}>
                <InputComponent
                  type="textarea"
                  label="Description"
                  name="description"
                  placeholder="Type here"
                  rows={5}
                />
              </Form.Item>
            </div>
            <p className="max-w-full text-left khula-text mt-[15px]">
              *Upselling additional experts is placed at a $500 incentive.
            </p>
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
