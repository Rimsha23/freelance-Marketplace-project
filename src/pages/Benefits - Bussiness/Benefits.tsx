import { Button } from "antd"


const Benefits = () => {
    return (
        <div className="md:w-[1073px] mt-[39px] md:mx-[45px] px-1 md:px-0">
        <div>
          <h1 className="libre-caslon-text text-[22px] text-[#CACACA] font-bold">
            Benefits
          </h1>
        </div>
        <div className="w-full md:h-[82px] border md:px-[25px] flex items-center md:mt-[27px] bg-white rounded-md">
          <div className="md:flex block justify-between items-center w-full md:p-0 p-2">
            <p className="khula-text text-[15px]">
            Check all the details of offer and benefits
            </p>
            <Button
            type="link"
              className="md:w-[172px] md:h-[49px] bg-[#3A0F7D] font-bold text-white flex justify-center items-center md:mt-0 mt-3"
              shape="round"
            >
                Check Benefits
            </Button>
          </div>
        </div>
      </div>
    )
}

export default Benefits