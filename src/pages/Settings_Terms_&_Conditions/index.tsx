import React from "react";
import SettingsSidebar from "../../app-components/Settings-sidebar";
export const SettingsTermsConditions: React.FC = () => {
  return (
    <>
        <div className=" ml-2 lg:flex-1 flex lg:flex-row flex-col p-4">
          <div className=" lg:justify-left lg:w-4/12 w-8/12 lg:ml-0  ml-16 ">
            <SettingsSidebar className=" w-full mb-4 lg:mb-0" />
          </div>
          <div className=" bg-white lg:flex-1 p-4 lg:mt-20 mt-80 lg:ml-1 ml-3  border-2 border-neutral-200 rounded-[5px]  ">
            <h2 className="text-[22px] text-[#CACACA] libre-caslon-text font-semibold mb-4  ">
              Terms & Conditions
            </h2>
            <div className="khula-text text-[14px] text-[#000]">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
                nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
                tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
                enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
                lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
                elementum tellus. </p>
              <p> Curabitur tempor quis eros tempus lacinia. Nam
                bibendum pellentesque quam a convallis. Sed ut vulputate nisi.
                Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu
                sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend
                magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices
                nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla
                varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis
                eleifend. Sed nec ante dictum sem condimentum ullamcorper quis
                venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
              </p>
              <p> Nam
                pulvinar blandit velit, id condimentum diam faucibus at. Aliquam
                lacus nisi, sollicitudin at nisi nec, fermentum congue felis.
                Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio.
                Sed vitae mauris nec ante pretium finibus. Donec nisl neque,
                pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus
                tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat
                sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum
                risus dapibus a. Duis felis ante, varius in neque eu, tempor
                suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus.
                Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut
                arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.</p>
              <p>
                Vestibulum dictum ultrices elit a luctus. Sed in ante ut leo congue
                posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales
                blandit sed et sem. Aenean quis finibus arcu, in hendrerit purus.
                Praesent ac aliquet lorem. Morbi feugiat aliquam ligula, et
                vestibulum ligula hendrerit vitae. Sed ex lorem, pulvinar sed auctor
                sit amet, molestie a nibh. Ut euismod nisl arcu, sed placerat nulla
                volutpat aliquet. Ut id convallis nisl. Ut mauris leo, lacinia sed
                elit id, sagittis rhoncus odio. Pellentesque sapien libero, lobortis
                a placerat et, malesuada sit amet dui. Nam sem sapien, congue eu
                rutrum nec, pellentesque eget ligula. Nunc tempor interdum ex, sed
                cursus nunc egestas aliquet. Pellentesque interdum vulputate
                elementum. Donec erat diam, pharetra nec enim ut, bibendum pretium
                tellus.</p>
            </div>
          </div>
        </div>

    </>
  );
};
