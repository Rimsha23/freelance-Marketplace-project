import { Card } from "antd/es";
import { TbDotsVertical } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { Rate } from "antd/es";
interface Size {
  small: string;
  large: string;
}

interface ImgSize {
  roundedFull: string;
  roundedLg: string;
}

const sizes: Size = {
  small: "w-52 h-[350px]",
  large: "w-56 h-[370px]",
};

const imgSizes: ImgSize = {
  roundedFull: "rounded-full h-28 w-28",
  roundedLg: "rounded-xl h-full w-full",
};

interface CardCommonProps {
  imageUrl: string;
  description?: string;
  name?: string;
  labels?: string;
  rating?: number;
  size: "small" | "large";
  imgSize: "roundedFull" | "roundedLg";
  openCardModal: (card: CardCommonProps) => void;
}

function CardCommonComponent(props: CardCommonProps) {
  const {
    imageUrl,
    description,
    name,
    labels,
    size,
    imgSize,
    rating,
    openCardModal,
  } = props;

  const [showRatePopup, setShowRatePopup] = useState<boolean>(false);
  const [showBars, setShowBars] = useState<boolean>(false);

  const displayedLabels = labels ? labels.split(" ").slice(0, 2) : [];
  return (
    <>
      <Card
        bodyStyle={{ padding: "10px" }}
        className={`${sizes[size]}${size === "large"
            ? "shadow-sm border-[2px] transform hover:-translate-y-1 transition-transform duration-300 ease-in-out  border-gray-200 h-[360px] flex flex-col items-center justify-center"
            : "max-sm:w-64 h-[360px]"
          } shadow-sm relative overflow-x-hidden border border-gray-200`}
        onMouseOver={() => setShowBars(true)}
        onMouseOut={() => setShowBars(false)}
      >
        {name && labels && (
          <div>
            {size === "large" && showBars && (
              <TbDotsVertical
                className="absolute right-2 top-4 text-violet-800 text-lg"
                onClick={() => {
                  setShowRatePopup(!showRatePopup);
                }}
              />
            )}
            {showBars && (
              <div
                onClick={() => openCardModal(props)}
                className={`${showRatePopup ? "top-10 right-3 " : "hidden"
                  } z-10 flex justify-start gap-3 pl-2 bg-white absolute p-3 items-center w-11/12 border rounded-md shadow-lg text-violet-800 font-medium`}
              >
                <FaStar />
                <button>Give Rating</button>
              </div>
            )}
          </div>
        )}
        <div className={`flex flex-col items-center relative`}>
          <img src={imageUrl} alt="" className={`${imgSizes[imgSize]}`} />
          {!description && name && labels ? (
            <div className="mt-3">
              <h2 className="text-center text-lg text-[#3A0F7D] font-semibold mt-4 tracking-wid active:text-md cursor-pointer">
                {name}
              </h2>
              <div className="flex flex-col justify-around gap-4 mt-4 items-center">
                <div
                  className="flex items-center justify-around w-full gap-3"
                >
                  {displayedLabels.map((l: string, index: number) => (
                    <p
                      key={index}
                      className="p-2  text-[#3A0F7D] text-md font-medium rounded-lg"
                      style={{ backgroundColor: "rgba(58, 15, 125, 0.3)" }}
                    >
                      {l}
                    </p>
                  ))}
                </div>
                <div className=" ratings flex gap-2 text-yellow-500 text-xl">
                  <Rate value={rating} disabled={true}></Rate>
                </div>
              </div>
            </div>
          ) : (
            <p className="p-5 font-normal text-black text-center">
              {description}
            </p>
          )}
        </div>
      </Card>
    </>
  );
}

export { CardCommonComponent };
