// MyTeam.tsx
import React, { useState, useEffect } from "react";
import { CardCommonComponent } from "../../common-components/card";
import ButtonComp from "../../common-components/button";
import { Modals } from "../../common-components/modal";
import Member from "../../assets/images/Add_Member_icon.png"
import SVGIcon from "../../common-components/SVgicon/index";
import {
  fetchExpertData,
  ExpertState,
  Expert,
} from "../../store/HiredExpertsList/HiredExpertsListSlice";
import { useDispatch, useSelector } from "react-redux";
import RatingModal from "./RatingModal";
import AddMemberModal from "./AddMemberModal";
import PaginationComponent from "../../common-components/Pagination";
import { AppDispatch } from "../../store/root-store";

const CrossIcon = () => {
  return (
    <>
      <SVGIcon
        hoverColor="black"
        icon={[
          {
            d: "M1.79083e-07 6.00925C0.000800173 9.32322 2.69038 12 6.01915 12C9.31833 12 12.0035 9.30242 11.9999 5.99165C11.9963 2.66567 9.30833 -0.0015049 5.96155 9.53674e-05C2.67878 0.00169563 -0.000799815 2.70247 1.79083e-07 6.00925ZM3.18957 2.79927C3.35557 2.80167 3.45997 2.89087 3.56077 2.99247C4.31797 3.75247 5.08036 4.50766 5.83115 5.27365C5.96475 5.41005 6.03075 5.41605 6.16795 5.27565C6.92274 4.50406 7.68994 3.74447 8.45153 2.97967C8.57553 2.85527 8.70993 2.76527 8.89393 2.81207C9.22553 2.89567 9.29833 3.26807 9.03193 3.53527C8.26513 4.30446 7.49954 5.07486 6.72275 5.83405C6.57995 5.97365 6.59475 6.03965 6.72835 6.17085C7.49434 6.92204 8.24953 7.68403 9.00953 8.44123C9.13833 8.56923 9.23793 8.70563 9.18553 8.89922C9.09793 9.22322 8.73393 9.29882 8.47513 9.04122C7.76674 8.33603 7.06354 7.62603 6.35475 6.92084C6.23875 6.80524 6.13795 6.59804 5.99195 6.61044C5.86835 6.62084 5.75755 6.80724 5.64475 6.91964C4.94716 7.61683 4.25037 8.31483 3.55477 9.01402C3.42597 9.14322 3.28797 9.23842 3.09518 9.18442C2.77318 9.09362 2.70358 8.73123 2.96278 8.47123C3.72957 7.70203 4.49436 6.93044 5.27196 6.17245C5.42436 6.02405 5.39836 5.95405 5.26356 5.82165C4.51276 5.08365 3.77117 4.33646 3.02678 3.59207C2.97518 3.54047 2.92038 3.49007 2.87758 3.43127C2.78318 3.30167 2.77198 3.15967 2.84638 3.01727C2.92038 2.87567 3.04398 2.80727 3.18957 2.79927Z",
            fill: "#3A0F7D",
          },
        ]}
        width={12}
        height={12}
        className="mt-1 mr-2 hover:text-black"
      />
    </>
  );
};

const MyTeam: React.FC = () => {
  const [isMemberModalOpen, setIsMemberModalOpen] = useState<boolean>(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<Expert | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ItemsPerPage = 11;
  //Logic for Onchange Prop of Pagination component
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
//Fetching My Team members data
  const dispatch:AppDispatch = useDispatch();
  const expertData = useSelector(
    (state: { expertData: ExpertState }) => state.expertData.experts
  );
 // Function for opening modal with the info of that specific Expert
  const openCardModal = (card: Expert) => {
    setSelectedCard(card);
    setIsCardModalOpen(true);
    setUserRating(card.rating || 0);
  };
  const startIndex = (currentPage - 1) * ItemsPerPage;
  const endIndex = startIndex + ItemsPerPage;
  //Logic to display data according to ItemsPerPage number
  const filteredExpertData = expertData.slice(startIndex, endIndex);
  useEffect(() => {
    dispatch(fetchExpertData());
  }, [dispatch]);

  //Logic for cancel Rating

  const handleCancelRating = () => {
    setIsRatingModalOpen(false);
  };

  return (
    <>
      <div className="flex">
        <div className="flex-col mt-6 ml-10 mr-10 w-full">
          <div className=" flex flex-row justify-between mb-6 mt-1 items-center xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col items-center ">
            <h1 className="text-[22px] text-[#CACACA] libre-caslon-text font-semibold mb-6">
              My Team
            </h1>
            <div className="xl:flex-row lg:flex-row md:flex-row sm:flex-col ">
              <ButtonComp
                text="Log History"
                className="w-36 h-10 mb-6 mr-2 h-10"
              />
              <ButtonComp
                text="Request Hours"
                className="w-36 h-10 mb-6 mr-2 h-10"
              />
              <ButtonComp text="Billing Info" className="w-36 h-10 mb-6 h-10" />
            </div>
          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-2">
            <div className="w-56 h-[360px]  rounded-[8px] border border-[#3A0F7D] transform hover:-translate-y-1 transition-transform duration-300 ease-in-out ">
              <div className="flex flex-col  mt-20 ml-8">
                <img
                  onClick={() => setIsMemberModalOpen(true)}
                  src={Member}
                  className="h-24 w-32 pl-7"
                />
                <span
                  onClick={() => setIsMemberModalOpen(true)}
                  className="mt-3 text-[17px] font-semibold text-khula text-[#3A0F7D] hover:text-violet-500 active:text-[15px] "
                >
                  + Add New Member
                </span>
              </div>
            </div>
            {/* Displaying Expert data in cards*/}
            {filteredExpertData.map((element: Expert, index: number) => (
              <div key={index}>
                <CardCommonComponent
                  imageUrl={element.image || ""}
                  name={element.name_of_expert}
                  labels={
                    element.area_of_expertise &&
                    element.area_of_expertise.join(" ")
                  }
                  size="large"
                  imgSize="roundedFull"
                  rating={element.rating}
                  openCardModal={() => openCardModal(element)}
                />
              </div>
            ))}
        {/* Modal with the additional info of selected expert */}
            <Modals
              open={isCardModalOpen}
              width="500px"
              height="200px"
              onClose={() => setIsCardModalOpen(false)}
              title=""
            >
              <div className="flex flex-col justify-center items-center mt-12">
                <img
                  src={selectedCard?.image || ""}
                  alt=""
                  className={`rounded-full h-32 w-32`}
                />

                <div className="mt-3">
                  <h2 className="text-center text-[17px] text-[#3A0F7D] font-semibold mt-4 tracking-wid active:text-md cursor-pointer">
                    {selectedCard?.name_of_expert}
                  </h2>
                  <div className="flex flex-col justify-around gap-4 mt-6 items-center">
                    <div className="flex items-center justify-center w-full gap-3 flex-wrap">
                      {selectedCard?.area_of_expertise &&
                        selectedCard?.area_of_expertise.map(
                          (l: string, index: number) => (
                            <p
                              key={index}
                              className="p-2 text-[#3A0F7D] text-md font-medium rounded-lg"
                              style={{
                                backgroundColor: "rgba(58, 15, 125, 0.3)",
                              }}
                            >
                              {l}
                            </p>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col mt-10 justify-center items-center ">
                <h2 className="block text-xs md:text-sm lg:text-base xl:text-g text-[#808080] khula-text font-semibold leading-normal mb-2">
                  currently agreed hours
                </h2>
                <div className=" mt-2 pt-3  w-24 h-[49px] bg-[#EFEFEF] font-[133px] text-center khula-text rounded-[8px]">
                  {selectedCard?.weekly_commitment}
                </div>
              </div>
              <div className="flex-row mt-7 mb-8 justify-center items-center">
                <ButtonComp
                  text="Rate"
                  size="medium"
                  className="ml-16 mr-5 h-[50px]"
                  onClick={() => setIsRatingModalOpen(true)}
                />
                <ButtonComp
                  text="Request Hours"
                  size="medium"
                  variant="violet"
                  className="h-[50px]"
                />
                <div className="flex justify-center items-center mt-7">
                  <ButtonComp
                    variant="transparent"
                    text="End Engagement"
                    type="text"
                    icon={<CrossIcon />}
                  />
                </div>
              </div>
            </Modals>
         {/*Calling Rating Modal */}
            <RatingModal
              isOpen={isRatingModalOpen}
              onClose={() => setIsRatingModalOpen(false)}
              onCancelRating={handleCancelRating}
              userRating={userRating}
              setUserRating={setUserRating}
              selectedCard={selectedCard}
            />
            {/*Calling Add Member Modal */}
            <AddMemberModal
              isOpen={isMemberModalOpen}
              onClose={() => setIsMemberModalOpen(false)}
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <PaginationComponent
              totalPages={Math.ceil(expertData.length / ItemsPerPage)}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTeam;
