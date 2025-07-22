import React from "react";
import { Button } from "antd";
import { CgProfile } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";

const NavbarDropDownButtons: React.FC = () => {
  return (
    <div className="w-[123px]  h-[84px] border rounded-md absolute hidden md:block right-8 top-20 shadow-md  font-khula bg-white z-50">
      <Button
        type="text"
        size="large"
        children="Profile"
        className="font-semibold text-[#808080] w-full font-khula text-sm border-none flex justify-center items-center"
        icon={<CgProfile />}
      />
      <Button
        type="text"
        children="Logout"
        className="font-semibold text-[#808080] w-full py-0 border-none text-sm font-khula flex justify-center items-center"
        size="large"
        icon={<TbLogout2 />}
      />
    </div>
  );
};

export default NavbarDropDownButtons;
