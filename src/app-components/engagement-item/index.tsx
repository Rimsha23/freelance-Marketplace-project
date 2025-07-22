import React from 'react'
import ButtonComp from '../../common-components/button';
import { Link } from 'react-router-dom';

type objType = {
    text?: string,
    link?: string,
    btnText?: string,
    className?: string 
  };
export const EngagementItem: React.FC<objType>= ({text, btnText, link}) => {
  return (
    <>
    <div className='bg-white rounded-lg border border-[#E2E2E2]-[1px] w-full p-3 flex justify-between items-center mt-2 max-md:flex-col max-md:p-8'>
        <h2 className='khula-text text-[15px] max-sm:text-center'>{text}</h2>
        <div><Link to={link ? link : "#"}><ButtonComp variant='violet' text={btnText} className={`shadow-none max-lg:w-[200px] max-md:mt-3`}/></Link></div>
    </div>
    </>
  )
}
