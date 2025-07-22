import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActiveEngagementsHistory } from "../../store/expertEngagementsHistory";
import TableComponent from "../../common-components/Table/table";
import { AppDispatch, RootState } from "../../store/root-store";
import { back_button } from "../../utils/constants";
import { Link } from "react-router-dom";

//columns
const columns = [
    { title: "Client", dataIndex: "client", key: "client", align: "left" },
    { title: "Rate", dataIndex: "rates", key: "rates", align: "left" },
    { title: "Description", dataIndex: "description", key: "description", align: "left" },
];

export const ExpertActiveEngagementsHistory: React.FC = () => {
    //getting engagements history from store
    const activeEngagementsHistory = useSelector(
        (state: RootState) => state.expertEngagementsHistory.activeEngagementsHistory
    );
    console.log("from store:", activeEngagementsHistory);

    //fetching active engagements for expert panel
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(getActiveEngagementsHistory());
    }, [dispatch]);

    //actions for each row
    const data = activeEngagementsHistory
        ? activeEngagementsHistory.map((engagement) => (
            {
                client: engagement.created_by,
                rates: engagement.rate,
                description: engagement.description
            }
        ))
        : [];

    return (
        <div className="w-full m-8">
            <div className="flex space-x-3">
                <Link to={'/expert-engagements'}><img src={back_button} /></Link>
                <h1 className="libre-caslon-text text-[#CACACA] text-[22px]">
                    Engagement History
                </h1>
            </div>
            <div className="mt-8">
                <div className="mx-7 max-lg:space-x-[150px] lg:space-x-[300px] max-sm:block lg:flex md:flex text-[#808080] pb-[16px] text-[14px] font-khula font-semibold">
                    {columns.map(column => (
                        <div>{column.title}</div>
                    ))}
                </div>
                <TableComponent columns={columns} data={data} columnStyle="w-[300px] max-lg:w-[200px]" />
            </div>
        </div>
    );
};
