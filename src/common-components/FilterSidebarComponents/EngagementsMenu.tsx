import { useState } from 'react'
import SVGIcon from '../SVgicon'
import { filterNagtiveIcon, filterPlusIcon } from '../../pages/Log Hours/LogHoursIcons'
import InputComponent from '../input'
import { sidebarFilterObjType } from '../../pages/Log Hours/LogHours'

type engagementsMenuProps = {
    setSearchBySidebarFilter : React.Dispatch<React.SetStateAction<sidebarFilterObjType | null>>;
    searchBySidebarFilter : sidebarFilterObjType | null
}

function EngagementsMenu({setSearchBySidebarFilter , searchBySidebarFilter} : engagementsMenuProps) {
    const [engagementMenuIsOpen, setEngagementMenuisOpen] = useState<boolean>(false)
    return (
        <div className='py-[7px] border-b'>
            <div className='flex justify-between'>
                <h1>
                    Engagement
                </h1>
                <span className='cursor-pointer pt-2 pl-2 hover:bg-gray-200 rounded-full' onClick={() => setEngagementMenuisOpen(!engagementMenuIsOpen)}>
                    {
                        engagementMenuIsOpen ? <SVGIcon icon={filterNagtiveIcon} className='' /> : <SVGIcon icon={filterPlusIcon} className='' />
                            
                    }

                </span>
            </div>
            <div className={`mt-[18px] ${engagementMenuIsOpen ? '' : 'hidden'}`}>
                <InputComponent label='Engagement Name' placeholder='Engagement Name' value={searchBySidebarFilter?.engagement} onChange={(e : React.ChangeEvent<InputEvent>) => setSearchBySidebarFilter({ ...searchBySidebarFilter,engagement : e.target.value})} />
            </div>
        </div>
    )
}

export default EngagementsMenu