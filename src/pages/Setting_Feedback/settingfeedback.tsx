import React, { useState } from "react";
import ButtonComp from "../../common-components/button";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import InputComponent from "../../common-components/input";
import SettingsSidebar from "../../app-components/Settings-sidebar";
import { Modals } from "../../common-components/modal";
import image1 from '../../assets/Group.png'
import { feedbackApi } from "../../store/FeedbackSlice/feedbackslice";
import { userId } from "../../utils/constants";
const SettingFeedback: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch();
  const onFinish = (values: {
    subject: string;
    message: string;
  }) => {
    console.log("Received values of form: ", values);
    const formData = {
      user: userId,
      subject: values.subject,
      message: values.message,

    };
    console.log(formData, "===>formData");
    dispatch(feedbackApi(formData));
    setIsModalOpen(true)
  };
  return (
    <>
      <div className="flex">
        <SettingsSidebar />
        <div
          className={`bg-white w-[755px] h-[546px] rounded-lg border-[#E2E2E2] mt-24 ml-6 border-2 pl-10`}
        >
          <h1
            className={`text-[22px] font-bold leading-7 font-LibreCaslonText text-[#CACACA] pt-6 pb-8 `}
          >
            Feedback
          </h1>
          <div className="w-96">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="subject"
                rules={[
                  { required: true, message: "Please Enter subject!" },
                ]}
              >
                <InputComponent type='default' size='medium' placeholder='Type here' variant='primary' label='Subject' className=' h-[40px] py-3' />
              </Form.Item>
              <Form.Item
                name="message"
                rules={[{ required: true, message: "Please Enter message!" }]}
                hasFeedback
              >
                <InputComponent type='textarea' rows={6}  label='Message' placeholder='Type here' className='h-[202px] ' />
              </Form.Item>
              <ButtonComp className='mt-4 ml-6 w-[189px] h-[48px] bg-purple-900 ' size='medium' variant='violet' text='Submit' htmlType='submit'></ButtonComp>
              {isModalOpen && (
                <Modals width='460px' height='467px' open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                  <div className='flex justify-center items-center pt-16'>
                    <img src={image1} alt='image1' className='w-[90px] h-[90px]' />
                  </div>
                  <div className="text-stone-300 text-[22px] flex justify-center items-center font-bold libre-caslon-text">Successfully Done!</div>
                  <div className='text-black text-[15px] font-normal   pt-8 px-5'>
                    <p>You feedback has been successfully submited to Growtal team. will reachout soon with feedback</p>
                    <div className='flex items-center justify-center text-center'>
                      <ButtonComp onClick={() => setIsModalOpen(false)} className='mt-9 w-28' variant='violet' text='Continue' htmlType='submit'></ButtonComp>
                    </div>

                  </div>

                </Modals>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingFeedback;