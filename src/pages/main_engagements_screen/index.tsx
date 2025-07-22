import React, { useState } from "react";
import ButtonComp from "../../common-components/button";
import { EngagementItem } from "../../app-components/engagement-item";
import { GrowTeamModal } from "../../app-components/enagagement-grow-team-modal";

export const Engagements: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="h-screen w-full">
        <div className="max-sm:m-4 m-8">
          <div className="flex justify-between">
            <h2 className="text-[#CACACA] text-[22px] libre-caslon-text">
              Engagements
            </h2>
            <div>
              <ButtonComp
                text="+ Grow your Team"
                className="w-40"
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>
          <div className="mt-7 max-md:space-y-8">
            <EngagementItem
              text="Preview the Active Engagements"
              btnText="Active Engagements"
              link="/expert-active-engagements"
            />
            <EngagementItem
              text="Preview the Requested Hours"
              btnText="Requested hours"
              link="/expert-engagements-requested-hours"
            />
            <EngagementItem
              text="Preview the Historical Engagement"
              btnText="Historical Engagements"
              link="/expert-engagements-history"
            />
          </div>
        </div>
        {showModal ? (
          <GrowTeamModal
            checkModal={showModal}
            closeModal={() => setShowModal(false)}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
