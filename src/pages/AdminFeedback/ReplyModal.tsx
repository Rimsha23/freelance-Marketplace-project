import React from "react";
import { Modals } from "../../common-components/modal";
import ButtonComp from "../../common-components/button";
import InputComponent from "../../common-components/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/root-store";
import { addNewReplyFeedback } from "../../store/ReplyFeedback/replyFeedbackSplice";
import { Form } from "antd";

type ReplyModalProps = {
  open: boolean;
  onClose: () => void;
  subject: string;
  id: number | undefined;
};

const ReplyModal: React.FC<ReplyModalProps> = ({
  open,
  onClose,
  subject,
  id,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const [form] = Form.useForm();
  //Logic for posting feedback reply
  const onFinish = (values: { user_id: number | undefined; reply: string }) => {
    const replyData = {
      user_id: id,
      reply: values.reply,
    };
    console.log("Received values of form: ", replyData);
    dispatch(addNewReplyFeedback(replyData));
    form.resetFields();
    onClose();
  };

  return (
    <Modals title="Reply Feedback" open={open} onClose={onClose} width="450px">
      <div className="mt-4">
        <Form form={form} onFinish={onFinish}>
          <h2 className="block mt-5 text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal mb-2">
            Subject
          </h2>
          <div className="mt-3 mb-5 pt-3 pl-4 w-full h-[49px] bg-[#EFEFEF] text-[14px] font-[400] text-black khula-text rounded-[8px]">
            {subject}
          </div>
          <Form.Item
            name="reply"
            rules={[{ required: true, message: "Please enter a reply" }]}
          >
            <InputComponent
              type="textarea"
              placeholder="description"
              label="Description of Engagements"
              rows={6}
            />
          </Form.Item>
          <div className="flex-row mt-10 mb-10 justify-center items-center">
            <ButtonComp
              text="Cancel"
              size="medium"
              className="ml-12 mr-5 h-[50px]"
              onClick={onClose}
            />
            <ButtonComp
              text="Send"
              size="medium"
              variant="violet"
              className="h-[50px]"
              htmlType="submit"
            />
          </div>
        </Form>
      </div>
    </Modals>
  );
};

export default ReplyModal;
