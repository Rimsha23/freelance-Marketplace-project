import React from "react";
import { Modals } from "../../common-components/modal";
import ButtonComp from "../../common-components/button";
import { accepted_engagement_icon } from "../../utils/constants";

type props = {
  checkModal?: boolean;
  closeModal?: () => void;
};

export const ExpertAcceptEngagementModal: React.FC<props> = ({
  checkModal,
  closeModal,
}) => {
  return (
    <>
      <div>
        <Modals
          title="Requset to End Engagement"
          open={checkModal}
          onClose={closeModal}
          className="libre-caslon-text flex justify-center items-center"
        >
          <div className="flex justify-center my-5">
            <img className="w-20 h-20" src={accepted_engagement_icon} />
          </div>
          <h2 className="flex justify-center text-[#CACACA] text-xl mb-3 libre-caslon-text">
            Congratulations!
          </h2>
          <p className="flex justify-center khula-text animate-none">
            Congratulations you egnagement has been started. From now you can
            you request hours to your clients.
          </p>
          <div className="my-[24px] flex justify-center">
            <ButtonComp
              className="shadow-none ml-[17px] max-sm:w-[40px]"
              variant="violet"
              text="Continue"
              htmlType="button"
              onClick={() => { closeModal?.(); window.location.reload() }}
            />
          </div>
        </Modals>
      </div>
    </>
  );
};
