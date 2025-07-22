import React, { useEffect } from "react";
import { Form, Select,DatePicker} from "antd/es";
import { Modals } from "../../common-components/modal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/root-store";
import { updateAdminNotification } from "../../store/pushNotification/pushNotificationSlice";
import InputComponent from "../../common-components/input";
import ButtonComp from "../../common-components/button";
import { useSelector } from "react-redux";
import { AllAccountsState } from "../../store/allAcountSlice/allAcountSlice";

interface EditNotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    notificationData: {
        id?: number;
        Notification_name: string;
        sent_to: number[];
        activation_time: string;
    };
}

const EditNotificationModal: React.FC<EditNotificationModalProps> = ({
    isOpen,
    onClose,
    notificationData,
}) => {
    const dispatch: AppDispatch = useDispatch();
    const allAccounts = useSelector((state: { allAccounts: AllAccountsState }) => state.allAccounts.allAcounts);
    const { Option } = Select;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            Notification_name: notificationData.Notification_name,
            sent_to: notificationData.sent_to,
            activation_time: notificationData.activation_time,
        });
    }, [notificationData, form]);

    const onFinish = (values: {
        Notification_name: string;
        sent_to: number[];
        activation_time: string;
    }) => {
        const updatedData = {
            id: notificationData.id,
            Notification_name: values.Notification_name,
            sent_to: values.sent_to,
            activation_time: values.activation_time,
        };
console.log(updatedData)
        dispatch(updateAdminNotification(updatedData));
        onClose();
    };
const onCancel = () => {
    onClose();
}
    return (
        <Modals
            open={isOpen}
            onClose={onClose}
            title="Edit Notification"
            width="450px"
        >
            <Form form={form} onFinish={onFinish}>
                <div className="mt-6">
                    <Form.Item
                        name="Notification_name"
                    >
                        <InputComponent type="textarea" label="Notification Name" rows={5} />
                    </Form.Item>
                </div>
                <div className="mt-5">
                    <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] mb-2 khula-text font-semibold leading-normal ">
                        Activation Time
                    </label>
                    <Form.Item name="activation_time">

                        <input
                            className="w-full border-[1px] border-[#808080] rounded-[8px] bg-[#FFF] text-[14px] font-normal khula-text"
                            type="datetime-local"
                        />

                    </Form.Item>
                </div>
                <div className="mt-5">
                    <label className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] mb-2 khula-text font-semibold leading-normal ">
                        Sent to
                    </label>
                    <Form.Item
                        name="sent_to"
                    >
                        <Select
                            className={`border-[1px] border-[#808080] rounded-[8px] bg-[#FFF] text-[14px] font-normal khula-text mb-2  active:h-auto  w-full h-fit`}
                            showSearch
                            placeholder="Select Expert"
                            optionFilterProp="children"
                            mode="multiple"


                        >
                            {allAccounts.map((account) => (
                                <Option key={account.id} value={account.id}>
                                    {account.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className="mt-7">
                    <ButtonComp
                        text="Cancel"
                        size="medium"
                        className="ml-12 mr-5 h-[50px]"
                        onClick={onCancel}
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

export default EditNotificationModal;
