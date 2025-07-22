import React, { useEffect, useState } from "react";
import { Modals } from "../../common-components/modal";
import ButtonComp from "../../common-components/button";
import InputComponent from "../../common-components/input";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select,message } from "antd";
import { postExpertData } from "../../store/referPage/referPostSlice";
import { fetchExpertData } from "../../store/referPage/referGetSlice";
import { postBusinessData } from "../../store/referPage/referBusinessPostSlice";
import { fetchBusinessData } from "../../store/referPage/referBusinessGetSlice";


interface FormData {
  email: string;
  shareable_link: string;
  explanation_of_incenticves: string;
  name_of_expert: number | string;
  id: number;
  user: number;
  full_name: string;
  client_name: string;
  application_link: string
  incentives_message: string;
} 

const ReferMainPage: React.FC = () => {
  const [expertModalOpen, setExpertModalOpen] = useState<boolean>(false);
  const [businessModalOpen, setBusinessModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleChange = (selectedValue: number) => {
    form.setFieldsValue({ name_of_expert: (selectedValue)});
  };
  const handleChangeBusiness = (selectedValue: number) => {
    form.setFieldsValue({ client_name: selectedValue });
  };

  useEffect(() => {
    dispatch(fetchExpertData());
  }, []);
  useEffect(() => {
    dispatch(fetchBusinessData());

  }, []);
 
  const dataFromStore = useSelector(state =>  state.refergetSlice.getData)
  console.log(dataFromStore)
  const dataPostStore = useSelector(state =>  state.referpostSlice.data)
  console.log(dataPostStore)
  const businessDataFromStore = useSelector((state) => state.referBusinessGetSlice.getBusinessData);
  console.log(businessDataFromStore);
  const businessDataPostStore = useSelector((state) => state.referBusinessPostSlice.businessData);
  console.log(businessDataPostStore);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await form.validateFields();
      const name_of_expert = form.getFieldValue("name_of_expert");
      const email = form.getFieldValue("Email");
      const shareable_link = form.getFieldValue("Shareable Application Link");
      const explanation_of_incenticves = form.getFieldValue(
        "Explanation of Incentives"
      ); 
      const formData: FormData = {
        id: 0,
        name_of_expert,
        email,
        shareable_link,
        explanation_of_incenticves,
        user: 0,
        full_name: ""
      };
      formData.id = 0;
    formData.user = 0; 
    formData.full_name = "";       
      console.log(formData);
      dispatch(postExpertData(formData));
    } catch (error) {
      console.log("Failed:", error);
      message.error("Please fill in all required fields.");
    }
  };

  const handleSubmitBusiness = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await form.validateFields();
      const client_name = form.getFieldValue("client_name");
      console.log(client_name)
      const email = form.getFieldValue("Email");
      const application_link = form.getFieldValue("application_link");
      const incentives_message = form.getFieldValue(
        "incentives_message"
      );
      const formDataBusiness: FormData = {
        id: 0,
        client_name,
        email,
        application_link,
        incentives_message,
        user: 0,
        full_name: ""
      };
         console.log(formDataBusiness);
      dispatch(postBusinessData(formDataBusiness));
    } catch (error) {
      console.log("Failed:", error);
      message.error("Please fill in all required fields.");
    }
  };
  

  const handleCancel = () => {
    setExpertModalOpen(false);
    form.resetFields();
    setBusinessModalOpen(false);
  }
  return (
    <>
   
      <div className="flex min-h-screen w-full">
        <div className="w-full pl-[45px] pr-[49px]">
          <div className="text-gray-300 text-[22px] font-bold break-words py-6">
            Refer
          </div>

          {/* Expert */}
          <div className="h-[96px] mb-5 ">
            <div className="py-5 border rounded-lg md:flex justify-between px-6 items-center bg-white w-full ">
              <div className="text-[15px] font-khula font-normal">
                You can refer an Expert
                </div>
              <div className="">
              <ButtonComp
                  variant="violet"
                  text="Refer Expert"
                  className="w-[145px] h-[49px]"
                  onClick={() => setExpertModalOpen(true)}
                />
              </div>
            </div>
            <Modals
                open={expertModalOpen}
                onClose={() => setExpertModalOpen(false)}
                title="Refer an Expert"
                width="483px"
                height="580px"
              >
                <Form form={form} onFinish={handleSubmit}>
                <div className="mt-[29px]">
                  <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal">Name of Expert</label>
                <Form.Item
                    name="name_of_expert"
                    rules={[
                      {
                        required: true,
                        message: "Please  select a name of client!",
                      },
                    
                    ]}
                    >
                  <div className=" mb-3 mt-2.5">
                    <Select
                       name="name_of_expert"
                       className="flex-shrink-0  h-[55px]  w-full border-[1px] border-[#808080] rounded-[8px]"  
                       variant="primary"
                       placeholder="Type Name"
                       options={dataFromStore.map(
                         (expert: { id: number; full_name: string }) => ({
                           key: expert.id,
                           value: expert.id,
                           label: expert.full_name,
                         })
                       )}
                       onChange={handleChange}
                    />
                  </div>
                  </Form.Item>
                </div>
                <div className="mt-[19px]">
                <Form.Item
                    name="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your valid E-mail!",
                      },
                      {
                        type: "email",
                        message: "The input is not valid email!",
                      },
                    ]}>
                  <div className=" mb-3 mt-2.5">
                    <InputComponent size="medium" variant="primary" placeholder="Type Email" label="Email" 
                    />
                  </div>
                  </Form.Item>
                </div>
                <div className="mt-[19px]">
                <Form.Item
                    name="Shareable Application Link"
                    rules={[{ required: true, message: "Please input Link!" }]}>
                  <div className="mb-3 mt-2.5">
                    <InputComponent size="medium" variant="primary" label="Shareable Application Link" placeholder="https://"
                    />
                  </div>
                  </Form.Item>
                </div>
                <div className="mt-[23px]">
                <Form.Item
                    name="Explanation of Incentives"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid explanation!",
                      },
                      {
                        pattern: /^[A-Za-z0-9\s]+$/,
                        message:
                          "Please enter a valid explanation (letters, numbers, and spaces only).",
                      },
                    ]}>
                  <div className=" mb-3 mt-2.5 ">
                    <InputComponent type="textarea" rows={6} label="Explanation of Incentives" placeholder="Description"
                    />
                  </div>
                  </Form.Item>
                </div>
                <div className="flex justify-center items-center gap-[22px] mb-[40px] mt-[33px] lg:flex-row md:flex-row  flex-col">
                <ButtonComp
                     className="w-[132px] h-[49px]"
                      variant="white"
                      text="Cancel"
                      onClick={handleCancel}
                    />
                    <ButtonComp
                      className="w-[132px] h-[49px]"
                      variant="violet"
                      text="Submit"
                      onClick={handleSubmit}
                    />
                </div>
                </Form>
              </Modals>
          </div>

          {/* Business */}
          <div className="h-[96px] mb-5">
            <div className="py-5 border rounded-lg md:flex justify-between px-6 items-center bg-white w-full">
              <div className="text-[15px] font-khula font-normal">
                You can refer a Business
                </div>
              <div className="">
              <ButtonComp
                  variant="violet"
                  text="Refer Business"
                  className="w-[155px] h-[49px]"
                  onClick={() => setBusinessModalOpen(true)}
                />
              </div>
            </div>
            <Modals
                open={businessModalOpen}
                onClose={() => setBusinessModalOpen(false)}
                title="Refer a Business"
                width="483px"
                height="580px"
              >
                <Form form={form} onFinish={handleSubmitBusiness}>
                <div className="mt-[29px]">
                  <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal">Name of Potential Client</label>
                <Form.Item
                    name="client_name"
                    rules={[
                      {
                        required: true,
                        message: "Please  select a name of client!",
                      },
                    
                    ]}
                    >
                  <div className=" mb-3 mt-2.5">
                    <Select
                       name="client_name"
                       className="flex-shrink-0  h-[55px]  w-full border-[1px] border-[#808080] rounded-[8px]"  
                       variant="primary"
                       placeholder="Type Name"
                       options={businessDataFromStore.map((business: { id: number; full_name: string }) => ({
                        key: business.id,
                        value: business.id,
                        label: business.full_name,
                      }))}
                      onChange={handleChangeBusiness}
                    />
                  </div>
                  </Form.Item>
                </div>
                <div className="mt-[19px]">
                <Form.Item
                    name="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your valid E-mail!",
                      },
                      {
                        type: "email",
                        message: "The input is not valid email!",
                      },
                    ]}>
                  <div className=" mb-3 mt-2.5">
                    <InputComponent size="medium" variant="primary" placeholder="Type Email" label="Email" 
                    />
                  </div>
                  </Form.Item>
                </div>
                <div className="mt-[19px]">
                <Form.Item
                    name="application_link"
                    rules={[{ required: true, message: "Please input Link!" }]}>
                  <div className="mb-3 mt-2.5">
                    <InputComponent size="medium" variant="primary" label="Shareable Application Link" placeholder="https://"
                    />
                  </div>
                  </Form.Item>
                </div>
                <div className="mt-[23px]">
                <Form.Item
                    name="incentives_message"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a valid explanation!",
                      },
                      {
                        pattern: /^[A-Za-z0-9\s]+$/,
                        message:
                          "Please enter a valid explanation (letters, numbers, and spaces only).",
                      },
                    ]}>
                  <div className=" mb-3 mt-2.5 ">
                    <InputComponent type="textarea" rows={6} label="Explanation of Incentives" placeholder="Description"
                    />
                  </div>
                  </Form.Item>
                </div>
                <div className="flex justify-center items-center gap-[22px] mb-[40px] mt-[33px] lg:flex-row md:flex-row  flex-col">
                <ButtonComp
                     className="w-[132px] h-[49px]"
                      variant="white"
                      text="Cancel"
                      onClick={handleCancel}
                    />
                    <ButtonComp
                      className="w-[132px] h-[49px]"
                      variant="violet"
                      text="Submit"
                      onClick={handleSubmitBusiness}
                    />
                </div>
                </Form>
              </Modals>
          </div>

          {/* History */}
          <div className="h-[96px] mb-5">
            <div className="py-5 border rounded-lg md:flex justify-between px-6 items-center bg-white w-full">
              <div className="text-[15px] font-khula font-normal">
              Preview you referral History
                </div>
              <div className="">
                <Link to="/referralhistory">
                <ButtonComp
                  variant="violet"
                  text="Referral History"
                  className="w-[165px] h-[49px]"
                />
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
     
    </>
  );
};

export default ReferMainPage;