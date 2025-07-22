import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modals } from "../../common-components/modal";
import InputComponent from "../../common-components/input";
import ButtonComp from "../../common-components/button";
import { Form } from "antd";
import { AppDispatch, RootState } from "../../store/root-store";
import {
    ExpertEngagementsRequestedHoursType,
    UpdateHoursType,
    deleteRequestedHoursRequest,
    updateExpertEngagementHours,
} from "../../store/expertEngaementsRequestedHours";
import { getActiveEngagements } from "../../store/expertActiveEngagements";

type props = {
    requestedHours?: number;
    businessName?: string;
    engagement: ExpertEngagementsRequestedHoursType | null;
    checkModal?: boolean;
    closeModal?: () => void;
};

export const ExpertEngagementsRequestedHoursModal: React.FC<props> = ({
    requestedHours,
    businessName,
    engagement,
    checkModal,
    closeModal,
}) => {
    const [selectedEngagement, setSelectedEngagement] = useState(engagement);
    const [business_name, set_business_name] = useState(businessName);
    const [requested_hours, set_requested_hours] = useState(requestedHours);

    console.log(businessName, requestedHours);

    useEffect(() => {
        setSelectedEngagement(engagement);
        set_business_name(businessName);
        set_requested_hours(requestedHours);
    }, [businessName, requestedHours]);

    const [form] = Form.useForm();

    const dispatch: AppDispatch = useDispatch();
    //fetching active engagements from store:
    useEffect(() => {
        dispatch(getActiveEngagements());
    }, []);
    let activeEngagements = useSelector(
        (state: RootState) => state.activeEngagements.activeEngagements
    );
    let currentHoursOfSelectedEngagement = activeEngagements?.filter(
        (engagement) => engagement.id == selectedEngagement?.engagement.id
    )[0]?.hours;

    //posting request for extra hours
    const onFinish = () => {
        let dataToSend: UpdateHoursType = {
            id: selectedEngagement ? selectedEngagement.engagement.id : 0,
            hours: currentHoursOfSelectedEngagement
                ? currentHoursOfSelectedEngagement
                : 0,
            requestedHours: selectedEngagement
                ? selectedEngagement.hours_to_increars
                : 0,
        };
        dispatch(updateExpertEngagementHours(dataToSend));
        dispatch(deleteRequestedHoursRequest(selectedEngagement?.id));
        closeModal?.();
    };

    return (
        <>
            <div>
                <Modals
                    title="Requested Hours"
                    open={checkModal}
                    onClose={closeModal}
                    className="libre-caslon-text flex justify-center items-center"
                >
                    <Form
                        onFinish={() => {
                            onFinish();
                            window.location.reload();
                        }}
                        form={form}
                        className="max-sm:w-[250px]"
                    >
                        <div className="mt-[28px]">
                            <Form.Item name="requested_hours_description">
                                <InputComponent
                                    type="text"
                                    label="Requested Hours Description"
                                    name="requested_hours_description"
                                    isDisabled={true}
                                    placeholder={`${business_name} has requested ${requested_hours} hours to add per week!`}
                                />
                            </Form.Item>
                        </div>
                        <div className="my-[48px] flex justify-center">
                            <ButtonComp
                                className="shadow-none max-sm:w-[40px]"
                                text="Deny"
                                onClick={() => {
                                    dispatch(deleteRequestedHoursRequest(selectedEngagement?.id));
                                    closeModal?.();
                                }}
                            />
                            <ButtonComp
                                className="shadow-none ml-[17px] max-sm:w-[40px]"
                                variant="violet"
                                text="Accept"
                                htmlType="submit"
                            />
                        </div>
                    </Form>
                </Modals>
            </div>
        </>
    );
};
