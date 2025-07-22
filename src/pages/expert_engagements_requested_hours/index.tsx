import React, { useEffect, useState } from 'react'
import { back_button } from '../../utils/constants';
import { Link } from 'react-router-dom';
import TableComponent from "../../common-components/Table/table";
import { AppDispatch, RootState } from '../../store/root-store';
import { useDispatch, useSelector } from 'react-redux';
import { getExpertEngagementsRequestedHours, ExpertEngagementsRequestedHoursType } from '../../store/expertEngaementsRequestedHours';
import { ExpertEngagementsRequestedHoursModal } from '../../app-components/expert-engagement-requested-hours-modal';

//columns
const columns = [
    { title: "Engagement Name", dataIndex: "engagements", key: "engagement_name" },
    { title: "Requested Hours", dataIndex: "requestedHours", key: "requested_hours" },
];


export const ExpertEngagementsRequestedHours: React.FC = () => {
    //useStates
    const [showModal, setShowModal] = useState(false);
    const [selectedEngagement, setSelectedEngagement] = useState<ExpertEngagementsRequestedHoursType | null>(null)

    const expertEngagementsRequestedHours = useSelector(
        (state: RootState) => state.expertEngagementsRequestedHours.expertEngagementsRequestedHours
    );
    console.log("from store:", expertEngagementsRequestedHours);

    //fetching active engagements requested hours for expert panel
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(getExpertEngagementsRequestedHours());
    }, [dispatch]);

    const OnRowClick = (engagement: ExpertEngagementsRequestedHoursType | null) => {
        console.log("selected engagement:", engagement)
        setSelectedEngagement(engagement)
        setShowModal(true);
    }

    const data = expertEngagementsRequestedHours
        ? expertEngagementsRequestedHours.map((engagement: ExpertEngagementsRequestedHoursType) => {
            return {
                engagements: <div onClick={() => OnRowClick(engagement)} key={engagement.engagement.id} >{engagement.engagement.name}</div>,
                requestedHours: <div onClick={() => OnRowClick(engagement)} key={engagement.engagement.id}>{engagement.hours_to_increars}</div>
            }
        })
        : [];

    return (
        <div className="w-full m-8">
            <div className="flex space-x-3">
                <Link to={'/expert-engagements'}><img src={back_button} /></Link>
                <h1 className="libre-caslon-text text-[#CACACA] text-[22px]">
                    Requested Hours
                </h1>
            </div>
            <div className="mt-8">
                <div className="mx-7 max-lg:space-x-[150px] lg:space-x-[700px] max-sm:flex-col md:flex text-[#808080] pb-[16px] text-[14px] font-khula font-semibold">
                    {columns.map(column => (
                        <div>{column.title}</div>
                    ))}
                </div>
                <TableComponent columns={columns} data={data} />
            </div>
            <ExpertEngagementsRequestedHoursModal engagement={selectedEngagement && (selectedEngagement)} businessName={selectedEngagement?.bussiness_name.full_name} requestedHours={selectedEngagement?.hours_to_increars} checkModal={showModal} closeModal={() => setShowModal(false)} />
        </div>
    );
};