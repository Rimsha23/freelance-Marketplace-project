import { useState } from "react";
import { calander_icon } from "../../utils/constants";
import {
  filterNagtiveIcon,
  filterPlusIcon,
} from "../../pages/Log Hours/LogHoursIcons";
import SVGIcon from "../SVgicon";
import InputComponent from "../input";

function DateMenu() {
  const [dateMenuIsOpen, setDateMenuIsOpen] = useState<boolean>(false);
  return (
    <div className="mt-[36px] border-b py-[7px]">
      <div className="flex justify-between ">
        <h1>Date</h1>
        <span
          className="cursor-pointer pt-2 pl-2 hover:bg-gray-200 rounded-full"
          onClick={() => setDateMenuIsOpen(!dateMenuIsOpen)}
        >
          {dateMenuIsOpen ? (
            <SVGIcon icon={filterNagtiveIcon} className="" />
          ) : (
            <SVGIcon icon={filterPlusIcon} className="" />
          )}
        </span>
      </div>
      <div className={`mt-[24px] ${dateMenuIsOpen ? "" : "hidden"}`}>
        <InputComponent
          type="date"
          label="From"
          className="mb-3"
          prefixicon={calander_icon}
        />
        <InputComponent type="date" label="To" prefixicon={calander_icon} />
      </div>
    </div>
  );
}

export default DateMenu;
