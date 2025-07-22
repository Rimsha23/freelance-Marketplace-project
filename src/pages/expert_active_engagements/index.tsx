import React, { useEffect, useState } from "react";
import ButtonComp from "../../common-components/button";
import { useDispatch, useSelector } from "react-redux";
import {
  EngagementType,
  getActiveEngagements,
} from "../../store/expertActiveEngagements";
import TableComponent from "../../common-components/Table/table";
import { ExpertRequestHoursModal } from "../../app-components/expert-request-hours-modal";
import { ExpertEndEngagementModal } from "../../app-components/expert-end-engagement-modal";
import { ExpertAcceptEngagementModal } from "../../app-components/expert-accept-engagement-modal";
import { AppDispatch, RootState } from "../../store/root-store";
import { updateEngagement } from "../../store/expertActiveEngagements";
import { back_button } from "../../utils/constants";
import { Link } from "react-router-dom";

//columns
const columns = [
  { title: "Engagements", dataIndex: "engagements", key: "engagements" },
  { title: "Actions", dataIndex: "actions", key: "actions" },
];

export const ExpertActiveEngagements: React.FC = () => {
  const [showRequestHoursModal, setShowRequestHoursModal] = useState(false);
  const [showEndEngagementModal, setShowEndEngagementModal] = useState(false);
  const [showAcceptEngagementModal, setShowAcceptEngagementModal] =
    useState(false);
  const [businessName, setBusinessName] = useState("");
  const [engagementName, setEngagementName] = useState("");
  const [engagementId, setEngagementId] = useState(0);

  const activeEngagements = useSelector(
    (state: RootState) => state.activeEngagements.activeEngagements
  );
  console.log("from store:", activeEngagements);

  //fetching active engagements for expert panel
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getActiveEngagements());
  }, [dispatch]);

  const acceptEngagement = (engagement: EngagementType) => {
    dispatch(updateEngagement(engagement.id));
  };

  //actions for each row
  const data = activeEngagements
    ? activeEngagements.map((engagement) =>
        engagement.ongoing == true
          ? {
              engagements: engagement.name,
              actions: (
                <div className="max-lg:flex">
                  {/*By clicking on Request hours button modal will open, then send request to business*/}
                  <ButtonComp
                    variant="white"
                    text={"Request Hours"}
                    className={`shadow-none max-lg:w-[200px] max-md:mt-3`}
                    onClick={() => {
                      setShowRequestHoursModal(true),
                        setBusinessName(engagement.created_by),
                        setEngagementName(engagement.name),
                        setEngagementId(engagement.id);
                    }}
                  />
                  {/* By clicking on this button, end engagement modal opens */}
                  <ButtonComp
                    variant="white"
                    text={"End"}
                    className={`shadow-none ml-3 max-lg:w-[200px] max-md:mt-3`}
                    onClick={() => setShowEndEngagementModal(true)}
                  />
                </div>
              ),
            }
          : {
              engagements: engagement.name,
              actions: (
                <div className="max-lg:flex max-lg:justify-center">
                  {/* By clciking on this, the engagement's ongoing property should be changed to true */}
                  <ButtonComp
                    variant="white"
                    text={"Accept"}
                    className={`shadow-none max-lg:w-[200px] max-md:mt-3`}
                    onClick={() => {
                      acceptEngagement(engagement),
                        setShowAcceptEngagementModal(true);
                    }}
                  />
                </div>
              ),
            }
      )
    : [];

  return (
    <div className="w-full m-8">
      <div className="flex space-x-3">
        <Link to={'/expert-engagements'}><img src={back_button} /></Link>
        <h1 className="libre-caslon-text text-[#CACACA] text-[22px]">
          Active Engagements
        </h1>
      </div>
      <div className="mt-8">
        <TableComponent columns={columns} data={data} />
      </div>
      {showRequestHoursModal ? (
        <ExpertRequestHoursModal
          businessName={businessName}
          engagementName={engagementName}
          engagementId={engagementId}
          checkModal={showRequestHoursModal}
          closeModal={() => setShowRequestHoursModal(false)}
        />
      ) : (
        ""
      )}
      {showEndEngagementModal ? (
        <ExpertEndEngagementModal
          checkModal={showEndEngagementModal}
          closeModal={() => setShowEndEngagementModal(false)}
        />
      ) : (
        ""
      )}
      {showAcceptEngagementModal ? (
        <ExpertAcceptEngagementModal
          checkModal={showAcceptEngagementModal}
          closeModal={() => setShowAcceptEngagementModal(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
};
