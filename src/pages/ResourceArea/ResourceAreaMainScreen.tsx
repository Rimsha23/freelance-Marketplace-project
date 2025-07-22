import React from "react";
import ButtonComp from "../../common-components/button";
import { Link } from "react-router-dom";

const ResourceAreaMainPage: React.FC = () => {
  return (
    <>
      <div className="flex min-h-screen w-full">
        <div className="w-full max-w-[1073px] pl-[45px] pr-[49px]">
          <div className="text-gray-300 text-[22px] font-bold break-words py-6">
            Resource Area
          </div>

          {/* Tax Information */}
          <div className="h-[82px] mb-3">
            <div className=" h-[82px] border rounded-lg md:flex justify-between px-6 items-center bg-white w-full">
              <div className="text-[15px] font-khula font-normal">
                Fill up your Tax Information
              </div>
              <div className="mr-3">
                <ButtonComp
                  variant="violet"
                  text="Tax Information"
                  className="w-[164px] h-[49px]"
                />
              </div>
            </div>
          </div>

          {/* Manage Money */}
          <div className="h-[82px] mb-3">
            <div className=" h-[82px] border rounded-lg md:flex justify-between px-6 items-center bg-white w-full">
              <div className="text-[15px] font-khula font-normal">
                Manage your Freelance Money
              </div>
              <div className="mr-3">
                <ButtonComp
                  variant="violet"
                  text="Manage Money"
                  className="w-[160px] h-[49px]"
                />
              </div>
            </div>
          </div>

          {/* Manage Contract */}
          <div className="h-[82px] mb-3">
            <div className=" h-[82px] border rounded-lg md:flex justify-between px-6 items-center bg-white w-full">
              <div className="text-[15px] font-khula font-normal">
                Manage your Contracts
              </div>
              <div className="mr-3">
                <Link to="/managecontract">
                  <ButtonComp
                    variant="violet"
                    text="Manage Contract"
                    className="w-[174px] h-[49px]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceAreaMainPage;
