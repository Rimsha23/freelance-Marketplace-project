import React from "react";
import ButtonComp from "../../common-components/button";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import { changePassword } from "../../store/ChangePasswordSlice";
import InputComponent from "../../common-components/input";
import SettingsSidebar from "../../app-components/Settings-sidebar";
const Change_Password: React.FC = () => {
  const dispatch = useDispatch();
  const onFinish = (values: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) => {
    console.log("Received values of form: ", values);
    const formData = {
      current_password: values.current_password,
      new_password: values.new_password,
      confirm_password: values.confirm_password,
    };
    console.log(formData, "===>formData");
    dispatch(changePassword(formData));
  };
  return (
    <>
    <div className="flex">
      <SettingsSidebar/>
    <div
      className={`bg-white w-[755px] h-[546px] rounded-lg border-[#E2E2E2] mt-24 ml-6 border-2 pl-10`}
    >
      <h1
        className={`text-[22px] font-bold leading-7 font-LibreCaslonText text-[#CACACA] pt-6 pb-8 `}
      >
        Change Password
      </h1>
      <div className="w-96">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="current_password"
            rules={[
              { required: true, message: "Please Enter current password!" },
            ]}
          >
            <InputComponent
              variant="primary"
              placeholder="Type here"
              label="Current Password"
              type="password"
              className="py-4"
            />
          </Form.Item>
          <Form.Item
            name="new_password"
            rules={[{ required: true, message: "Please Enter New Password!" }]}
            hasFeedback
          >
            <InputComponent
              variant="primary"
              placeholder="Type here"
              label="New Password"
              type="password"
              className="py-4"
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <InputComponent
              variant="primary"
              placeholder="Type here"
              label="Confirm Password"
              type="password"
              className="py-4"
            />
          </Form.Item>
          <ButtonComp className='mt-4 ml-6 w-[203px] h-[48px] bg-purple-900 ' size='medium' variant='violet' text='Change Password' htmlType="submit" ></ButtonComp>
        </Form>
      </div>
    </div>
    </div>
    </>
  );
};

export default Change_Password;