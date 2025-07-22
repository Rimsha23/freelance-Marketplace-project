import React, { useState } from "react";
import NavbarDropDownButtons from "../NavbarDropDownButton/NavbarDropDownButtons";
import { FiMenu } from "react-icons/fi";
import { Button, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { sideBarOpen } from "../../store/NavSideBarState/NavSideBarState";
import logo from "../../../src/assets/images/GrowTalLogo.jpg"
import settingIcon from "../../../src/assets/images/SettingLogo.jpg"
import notificationIcon from "../../../src/assets/images/NotificationIcon.jpg"
import dp from '../../../src/assets/images/DemoProfilePicture.jpg'
import dropDownArrow from '../../../src/assets/images/DropDownArrowIcon.jpg'
const Navbar: React.FC = () => {
  const dispatch = useDispatch()
  const sideBarIsOpen = useSelector((state : {navSideBarState : boolean}) => state.navSideBarState)
  const [opendropDownButton, setOpenDropDownButton] = useState(false);
  return (
    <div className=" top-0 w-full h-[70px] flex justify-between items-center bg-white md:p-0 px-1 border">
      <a href="#">
        <Image
          src={logo}
          alt="Logo"
          preview={false}
          className="md:pl-[48px]"
        />
      </a>
      <div className="flex md:space-x-[25px] space-x-3">
        <div className="flex space-x-1 mt-1">
          <Button className="md:block hidden" type="link">
            <Image
              src={settingIcon}
              alt="Setting Icon"
              preview={false}
            />
          </Button>
          <Button className="md:block hidden " type="link">
            <Image
              src={notificationIcon}
              alt="Setting Icon"
              preview={false}
            />
            <p className="bg-red-500 text-white rounded-full absolute top-0 right-3 text-xs px-1 h-fit">
              0
            </p>
          </Button>
        </div>
        <div className="border-l md:block hidden" />
        <div className="flex items-center">
          <Image
            src={dp}
            alt="Dp"
            className="cursor-pointer"
            preview={false}
          />
          <h1 className="ml-[14px] md:block hidden font-semibold text-[#3A0F7D] cursor-pointer">
            Ron Sharon
          </h1>
          <Button
            type="link"
            className="ml-[31px] mr-[34px] md:block hidden p-1"
            onClick={() => setOpenDropDownButton(!opendropDownButton)}
          >
            <Image
              preview={false}
              src={dropDownArrow}
              alt="Drop Down Arrow Icon"
              className={`${
                opendropDownButton ? " rotate-180 duration-300" : ""
              }`}
            />
          </Button>
        </div>
        {opendropDownButton ? <NavbarDropDownButtons /> : ""}
        <div className="sm:hidden flex items-center" onClick={() => {sideBarIsOpen ? dispatch(sideBarOpen(false)) : dispatch(sideBarOpen(true))}} >
          {sideBarIsOpen ? "" : <FiMenu size={25}/>}
        </div>
      </div>
    </div>
  );
};
export default Navbar;




