import React from 'react'
import ButtonComp from '../../common-components/button'
import { Link } from 'react-router-dom'
const EducationalScreen: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto pb-20 space-y-6 lg:pb-96 lg:space-y-4 lg:mx-0 lg:mt-[0px] lg:ml-14 ">
        <div className='mt-[39px]'>
          <h1 className="libre-caslon-text text-[22px] text-[#CACACA] font-bold lg:mr-[494px] xl:mr-[880px]">
            Educational Center
          </h1>
        </div>
        <div className="w-[300px] h-[200px] md:w-[400px] md:h-[220px] lg:w-full lg:h-[82px] border flex items-center justify-center bg-white rounded-md">
          <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:w-full lg:flex lg:space-x-24 lg:px-6 xl:space-x-[490px] ">
            <p className="khula-text px-6 text-[15px] lg:px-0">
              To enrich your profile learn from more resources
            </p>
            <Link to={'/learning'}>
              <ButtonComp
                variant='violet'
                text='Learning Resources'
                className='mt-1 h-8 py-[1px] text-xs font-normal lg:mb-10'
              />
            </Link>
          </div>
        </div>
        <div className="w-[300px] h-[200px] md:w-[400px] md:h-[220px] lg:w-full lg:h-[82px] mx-2 border flex items-center justify-center bg-white rounded-md">
          <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:w-full lg:flex lg:space-x-24 lg:px-6 xl:space-x-[490px] ">
            <p className="khula-text px-6 text-[15px] lg:px-0">
              To enrich you profile you can apply for more expertise
            </p>
            <Link to={'/applyexpertise'}>
              <ButtonComp
                variant='violet'
                text='Apply for Expertise'
                className='mt-1 h-8 py-[1px] text-xs font-normal lg:mb-10'
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default EducationalScreen