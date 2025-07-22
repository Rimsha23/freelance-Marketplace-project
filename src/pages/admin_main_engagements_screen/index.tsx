import React, { useState } from "react";
import ButtonComp from "../../common-components/button";
import { EngagementItem } from "../../app-components/engagement-item";
import { AdminCreateEngagementModal } from "../../app-components/admin-create-engagement-modal";
export const AdminEngagementsMainPage: React.FC = () => {
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
                text="+ Create Engagements"
                className="w-44"
                onClick={() => setShowModal(true)}
              />
            </div>
          </div>
          <div className="mt-7 max-md:space-y-8">
            <EngagementItem
              text="Check all the active engagements"
              btnText="Active Engagement"
              link="#"
            />
            <EngagementItem
              text="Check all the request for engagement"
              btnText="Engagement Request"
              link="#"
            />
            <EngagementItem
              text="Check all the engagement oppotunity"
              btnText="Engagement Opportunity"
              link="#"
            />
            <EngagementItem
              text="Check all the engagement history"
              btnText="Engagement History"
              link="#"
            />
          </div>
        </div>
        {showModal ? (
          <AdminCreateEngagementModal
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