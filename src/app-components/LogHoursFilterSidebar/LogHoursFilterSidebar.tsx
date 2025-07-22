import React from "react";
import SVGIcon from "../../common-components/SVgicon";
import { CrossIcon } from "../../pages/Log Hours/LogHoursIcons";
import ButtonComp from "../../common-components/button";
import { Button } from "antd";
import DateMenu from "../../common-components/FilterSidebarComponents/DateMenu";
import TimeMenu from "../../common-components/FilterSidebarComponents/TimeMenu";
import EngagementsMenu from "../../common-components/FilterSidebarComponents/EngagementsMenu";
import ClientMenu from "../../common-components/FilterSidebarComponents/ClientMenu";
import { sidebarFilterObjType } from "../../pages/Log Hours/LogHours";

type logHoursFilterSidebarPropsTypes = {
  filterSidebarIsOpen: boolean;
  setFilterSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchBySidebarFilter: React.Dispatch<
    React.SetStateAction<sidebarFilterObjType | null>
  >;
  searchBySidebarFilter: sidebarFilterObjType | null;
};

const LogHoursFilterSidebar: React.FC<logHoursFilterSidebarPropsTypes> = ({
  filterSidebarIsOpen,
  searchBySidebarFilter,
  setFilterSidebarIsOpen,
  setSearchBySidebarFilter,
}) => {
  return (
    <div
      className={`w-[274px] flex flex-col py-[32px] gap-11 z-10 absolute bg-white top-[70px] px-[28px] khula-text text-[15px] ${
        filterSidebarIsOpen ? "right-0" : "hidden"
      } shadow-md border-l border-b`}
    >
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-[#CACACA] text-xl font-bold">Filter</h1>
          <span
            className="cursor-pointer"
            onClick={() => setFilterSidebarIsOpen(false)}
          >
            <SVGIcon icon={CrossIcon} className="pt-1 pl-2" />
          </span>
        </div>
        <DateMenu />
        <TimeMenu
          setSearchBySidebarFilter={setSearchBySidebarFilter}
          searchBySidebarFilter={searchBySidebarFilter}
        />
        <EngagementsMenu
          setSearchBySidebarFilter={setSearchBySidebarFilter}
          searchBySidebarFilter={searchBySidebarFilter}
        />
        <ClientMenu
          setSearchBySidebarFilter={setSearchBySidebarFilter}
          searchBySidebarFilter={searchBySidebarFilter}
        />
      </div>
      <div className="flex space-x-3 items-center mt-5">
        <Button type="link" onClick={() => setSearchBySidebarFilter({})}>
          Clear
        </Button>
        <ButtonComp text="Apply" />
      </div>
    </div>
  );
};

export default LogHoursFilterSidebar;
