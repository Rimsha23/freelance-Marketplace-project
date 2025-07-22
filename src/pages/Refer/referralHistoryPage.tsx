import React from "react";
import TableComponent from "../../common-components/Table/table";
import ButtonComp from "../../common-components/button";
import backIconButton from "../../assets/BackArrowBtn.png";
import { Link } from "react-router-dom";

const ReferralHistoryPage: React.FC = () => {
  const columns = [
    {
      title: "Business",
      dataIndex: "business",
      key: "business",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const data = [
    {
      business: "Business",
      name: "Adrinal Joe",
      link: "www.adrinalj.com",
      date: "06-15-2022",
    },
    {
      business: "Expert",
      name: "Christina Hen",
      link: "www.christinah.com",
      date: "06-15-2022",
    },
    {
      business: "Business",
      name: "Adrinal Joe",
      link: "www.adrinalj.com",
      date: "06-15-2022",
    },
    {
      business: "Expert",
      name: "Christina Hen",
      link: "www.christinah.com",
      date: "06-15-2022",
    },
    {
      business: "Business",
      name: "Adrinal Joe",
      link: "www.adrinalj.com",
      date: "06-15-2022",
    },
    {
      business: "Expert",
      name: "Christina Hen",
      link: "www.christinah.com",
      date: "06-15-2022",
    },
    {
      business: "Business",
      name: "Adrinal Joe",
      link: "www.adrinalj.com",
      date: "06-15-2022",
    },
    {
      business: "Expert",
      name: "Christina Hen",
      link: "www.christinah.com",
      date: "06-15-2022",
    },
    {
      business: "Business",
      name: "Adrinal Joe",
      link: "www.adrinalj.com",
      date: "06-15-2022",
    },
    {
      business: "Expert",
      name: "Christina Hen",
      link: "www.christinah.com",
      date: "06-15-2022",
    },
    {
      business: "Business",
      name: "Adrinal Joe",
      link: "www.adrinalj.com",
      date: "06-15-2022",
    },
    {
      business: "Expert",
      name: "Christina Hen",
      link: "www.christinah.com",
      date: "06-15-2022",
    },
    {
      business: "Business",
      name: "Adrinal Joe",
      link: "www.adrinalj.com",
      date: "06-15-2022",
    },
    {
      business: "Expert",
      name: "Christina Hen",
      link: "www.christinah.com",
      date: "06-15-2022",
    },
    {
      business: "Business",
      name: "Adrinal Joe",
      link: "www.adrinalj.com",
      date: "06-15-2022",
    },
    {
      business: "Expert",
      name: "Christina Hen",
      link: "www.christinah.com",
      date: "06-15-2022",
    },
    {
      business: "Business",
      name: "Adrinal Joe",
      link: "www.adrinalj.com",
      date: "06-15-2022",
    },
    {
      business: "Expert",
      name: "Christina Hen",
      link: "www.christinah.com",
      date: "06-15-2022",
    },
    {
      business: "Business",
      name: "Adrinal Joe",
      link: "www.adrinalj.com",
      date: "06-15-2022",
    },
    {
      business: "Expert",
      name: "Christina Hen",
      link: "www.christinah.com",
      date: "06-15-2022",
    },
  ];

  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="w-full pl-[45px] pt-[39px] pr-[49px]">
          <div className="flex text-[22px] font-khula font-bold text-[#CACACA] mb-[33px]">
            <Link to="/refer">
              <ButtonComp
                size="small"
                variant="violet"
                className="mr-[19px] w-[40px h-[40px]"
                text={<img src={backIconButton} alt="" />}
              />
              Referral History
            </Link>
          </div>
          <div className="pr-[68px] pl-[24px] lg:flex  md:flex justify-between text-[#808080] pb-[16px] text-[14px] font-khula font-semibold">
            <div className="">Referral Type</div>
            <div className="pr-[75px]">Name</div>
            <div className="pr-[118px]">Link</div>
            <div className="">Date</div>
          </div>
          <TableComponent columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};
export default ReferralHistoryPage;
