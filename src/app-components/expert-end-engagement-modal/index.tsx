import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { Modals } from "../../common-components/modal";
import InputComponent from "../../common-components/input";
import ButtonComp from "../../common-components/button";
import { Form } from "antd";
import { getEndEngagementRequest, sendEndEngagementRequest} from "../../store/expertActiveEngagements";
import { AppDispatch } from "../../store/root-store";

type props = {
  checkModal?: boolean;
  closeModal?: () => void;
};

export const ExpertEndEngagementModal: React.FC<props> = ({
  checkModal,
  closeModal,
}) => {
  type EndEngagementProps = {
    link: string,
    description: string
  };

  const [form] = Form.useForm();

  const dispatch:AppDispatch = useDispatch();
  //fetching end engagements for expert panel
  useEffect(() => {
    dispatch(getEndEngagementRequest());
  }, [dispatch]);

  //posting suggestion
  const onFinish = (values: EndEngagementProps) => {
    console.log(values)
    dispatch(sendEndEngagementRequest(values));
    closeModal?.();
  };

  return (
    <>
      <div>
        <Modals
          title="Requset to End Engagement"
          open={checkModal}
          onClose={closeModal}
          className="libre-caslon-text flex justify-center items-center"
        >
          <Form onFinish={onFinish} form={form} className="max-sm:w-[250px]">
          <div className="mt-[28px]">
              <Form.Item
                name="link"
                rules={[{ required: true }]}
              >
                <InputComponent
                  type="text"
                  label="Meeting Link"
                  name="link"
                  placeholder="Paste here..."
                />
              </Form.Item>
            </div>
            <div className="mt-[28px]">
              <Form.Item
                name="description"
                rules={[{ required: true }]}
              >
                <InputComponent
                  type="textarea"
                  label="Reason for ending Engagement"
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
