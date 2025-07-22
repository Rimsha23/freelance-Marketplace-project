import { useState } from 'react'
import { filterNagtiveIcon, filterPlusIcon } from '../../pages/Log Hours/LogHoursIcons'
import SVGIcon from '../SVgicon'
import InputComponent from '../input'
import { sidebarFilterObjType } from '../../pages/Log Hours/LogHours'

type TimeMenuProps = {
    setSearchBySidebarFilter : React.Dispatch<React.SetStateAction<sidebarFilterObjType | null>>;
    searchBySidebarFilter : sidebarFilterObjType | null
}

function TimeMenu({setSearchBySidebarFilter ,searchBySidebarFilter } : TimeMenuProps) {
    const [timeMenuIsOpen, setTimeMenuisOpen] = useState<boolean>(false)
    return (
        <div className='border-b py-[7px]'>
            <div className='flex justify-between '>
                <h1>
                    Time
                </h1>
                <span className='cursor-pointer pt-2 pl-2 hover:bg-gray-200 rounded-full' onClick={() => setTimeMenuisOpen(!timeMenuIsOpen)}>
                    {
                        timeMenuIsOpen ? <SVGIcon icon={filterNagtiveIcon} className='' /> : <SVGIcon icon={filterPlusIcon} className='' />
                    }

                </span>
            </div>
            <div className={`md:flex mt-[25px] ${timeMenuIsOpen ? '' : 'lg:hidden'}`}>
                <div className="md:w-[48px] h-[49px]">
                    <InputComponent placeholder="5" label='Time' value={searchBySidebarFilter?.hours} onChange={(e : React.ChangeEvent<InputEvent>) => setSearchBySidebarFilter({...searchBySidebarFilter , hours : e.target.value})} />
                </div>
                <p className="text-[#808080] mt-11 md:ml-1 md:block hidden">/Hour</p>
                <div className="w-[48px] md:mt-[20px] mt-12 md:ml-1">
                    <InputComponent placeholder="20" value={searchBySidebarFilter?.minutes} onChange={(e : React.ChangeEvent<InputEvent>) => setSearchBySidebarFilter({...searchBySidebarFilter , minutes : e.target.value})} />
                </div>
                <p className="text-[#808080] mt-11 ml-1 md:block hidden">/Minute</p>
            </div>
        </div>
    )
}

export default TimeMenu