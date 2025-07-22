import React, { useEffect, useState } from "react";
import { Modals } from "../../common-components/modal";
import InputComponent from "../../common-components/input";
import ButtonComp from "../../common-components/button";
import { fetchAllAccounts } from "../../store/allAcountSlice/allAcountSlice";
import { addNewAdminNotification } from "../../store/pushNotification/pushNotificationSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/root-store";
import { Select, DatePicker } from "antd/es";
import { Form } from 'antd/es'
interface CreateNotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateNotificationModal: React.FC<CreateNotificationModalProps> = ({ isOpen, onClose }) => {
    const dispatch: AppDispatch = useDispatch()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    useEffect(() => {
        dispatch(fetchAllAccounts());
    }, [isOpen, dispatch]);
    const { Option } = Select;
    const allAccounts = useSelector((state: RootState) => state.allAccounts.allAcounts);
    const handleDropdownVisibleChange = (open: boolean) => {
        setDropdownOpen(open);
    };
    const [form] = Form.useForm();
    const onFinish = (values: {
        Notification_name: string;
        sent_to: number[];
        activation_time: string
    }) => {
        const formData = {
            Notification_name: values.Notification_name,
            sent_to: values.sent_to,
            activation_time: values.activation_time,
        };
        console.log("Received values of form: ", formData);
        dispatch(addNewAdminNotification(formData))

        form.resetFields();
        onClose();

    };
const onCancel = () =>{
    form.resetFields();
        onClose();

}
    return (
        <Modals open={isOpen} onClose={onClose} title="Create Notification" width="450px">
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
                        <DatePicker
                            showTime
                            className="w-full border-[1px] border-[#808080] rounded-[8px] bg-[#FFF] text-[14px] font-normal khula-text"
                            style={{ width: "100%", height: "55px" }}
                            placeholder="Set Time"
                            format="YYYY-MM-DDTHH:mm:ss.SSSZ"
                        // The value is set to a JavaScript Date object
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
                            className={`border-[1px] border-[#808080] rounded-[8px] bg-[#FFF] text-[14px] font-normal khula-text mb-2 h-[55px] active:h-auto  w-full h-${dropdownOpen ? 'auto' : '55'}`}
                            showSearch
                            placeholder="Select Expert"
                            optionFilterProp="children"
                            mode="multiple"
                            onDropdownVisibleChange={handleDropdownVisibleChange}

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

export default CreateNotificationModal;