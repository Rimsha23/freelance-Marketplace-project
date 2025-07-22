import React from "react";
import "./welcome.css";
import WelcomeCard from "./logCard";
import { vector10, vector7, vector8, vector9 } from "../../utils/constants";
const Welcome: React.FC = () => {
  return (
    <div className="relative welcom-bg h-screen flex items-center justify-center">
      <div className="relative" >
        <img src={vector9} className="w-[235px] h-[235px] md:w-[370px] md:h-[370px] lg:w-[450px] lg:h-[450px] xl:w-[680px] xl:h-[680px] " />
        <img src={vector10} className="absolute -bottom-5 right-0 w-[115px] h-[115px] md:w-[190px] md:h-[190px] lg:w-[200px] lg:h-[200px] xl:w-[295px] xl:h-[295px] " />
      </div>
      <div className="absolute md:ml-5 xl:ml-9">
        <WelcomeCard />
      </div>
      <img src={vector7} className="w-12 md:w-24 lg:w-28 xl:w-32 absolute top-4 right-4" />
      <img src={vector8} className="w-12 md:w-24 lg:w-28 xl:w-32 absolute bottom-4 left-4" />
    </div>
  );
};
export default Welcome;
