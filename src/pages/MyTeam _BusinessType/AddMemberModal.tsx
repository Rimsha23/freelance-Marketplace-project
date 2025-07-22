import React, { useEffect } from "react";
import InputComponent from "../../common-components/input";
import ButtonComp from "../../common-components/button";
import { Modals } from "../../common-components/modal";
import { addNewMember } from "../../store/HiredExpertsList/HiredExpertsListSlice";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import {
  ExpertProfileState,
  fetchExpertProfiles,
} from "../../store/AllExpertsProfiles/AllExpertsProfile";
import { Form } from "antd";
import { AppDispatch } from "../../store/root-store";
interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
  const { Option } = Select;
  const dispatch:AppDispatch = useDispatch();
  //Fetching registered experts profile data for sending expert name to Backend whom we business usertype wants to add
  useEffect(() => {
    dispatch(fetchExpertProfiles());
  }, [dispatch]);

  const expertProfiles = useSelector(
    (state: { expertProfiles: ExpertProfileState }) =>
      state.expertProfiles.expertProfiles
  );
//Logic for add member form submission
  const [form] = Form.useForm();
  const onFinish = (values: {
    title: string;
    digital_marketing: string;
    additional_info: string;
    weekly_commitment: number;
    name_of_expert: string;
  }) => {
    const formData = {
      title: values.title,
      digital_marketing: values.digital_marketing,
      additional_info: values.additional_info,
      weekly_commitment: values.weekly_commitment,
      name_of_expert: values.name_of_expert,
    };
    console.log("Received values of form: ", formData);
    dispatch(addNewMember(formData));
    form.resetFields();
    onClose();
    
  };
  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modals
      open={isOpen}
      width="500px"
      height="200px"
      onClose={onClose}
      title="Add Additional Team Member"
    >
      <Form form={form} onFinish={onFinish}>
        <div className="mt-6">
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter name of engagement",
              },
            ]}
          >
            <InputComponent type="text" label="Title" placeholder="Type here" />
          </Form.Item>
        </div>
        <div className="mt-4">
          <Form.Item
            name="digital_marketing"
            rules={[
              {
                required: true,
                message: "Please fill in this field",
              },
            ]}
          >
            <InputComponent
              type="text"
              label="Digital Marketing"
              placeholder="Type here"
              name="digital_marketing"
            />
          </Form.Item>
        </div>
        <div className="mt-4">
          <Form.Item
            name="additional_info"
            rules={[
              {
                required: true,
                message: "please fill in this info",
              },
            ]}
          >
            <InputComponent
              type="text"
              label="Additional Information"
              placeholder="Type here"
              name="additional_info"
            />
          </Form.Item>
        </div>
        <div className="mt-4">
          <Form.Item
            name="weekly_commitment"
            rules={[
              {
                required: true,
                message: "Please enter your required weekly commitment",
              },
            ]}
          >
            <InputComponent
              type="number"
              label="Weekly Commitment"
              placeholder="Type here"
              name="weekly_commitment"
            />
          </Form.Item>
        </div>
        <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] mb-2 khula-text font-semibold leading-normal ">
          Name of expert
        </label>
        <Form.Item
          name="name_of_expert"
          rules={[
            {
              required: true,
              message: "Please Enter Expert name",
            },
          ]}
        >
          <Select
            className="border-[1px] border-[#808080] rounded-[8px] bg-[#FFF] text-[14px] font-normal khula-text mb-2 h-[55px] w-24"
            showSearch
            placeholder="Select Expert"
            optionFilterProp="children"
          >
            {/* Mapping registered Experts name so that the business usertype can select which expert he wants to add to his team */}
            {expertProfiles.map((expert) => (
              <Option key={expert.id} value={expert.full_name}>
                {expert.full_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="flex-row mt-7 mb-8 justify-center items-center">
          <ButtonComp
            text="Cancel"
            size="medium"
            onClick={onCancel}
            className="ml-16 mr-5 h-[50px]"
          />
          <ButtonComp
            text="Submit"
            size="medium"
            variant="violet"
            htmlType="submit"
            className="h-[50px]"
          />
        </div>
      </Form>
    </Modals>
  );
};
export default AddMemberModal;
