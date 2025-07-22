import React, { useState } from 'react'
import SVGIcon from '../SVgicon'
import { filterNagtiveIcon, filterPlusIcon } from '../../pages/Log Hours/LogHoursIcons'
import InputComponent from '../input'
import { sidebarFilterObjType } from '../../pages/Log Hours/LogHours'

type clientMenuProps = {
    setSearchBySidebarFilter : React.Dispatch<React.SetStateAction<sidebarFilterObjType | null>>;
    searchBySidebarFilter : sidebarFilterObjType | null
}

function ClientMenu({setSearchBySidebarFilter , searchBySidebarFilter} : clientMenuProps) {
    const [clientMenuIsOpen, setClientMenuisOpen] = useState<boolean>(false)
    return (
        <div className='py-[7px] border-b'>
            <div className='flex justify-between'>
                <h1>
                    Client
                </h1>
                <span className='cursor-pointer pt-2 pl-2 hover:bg-gray-200 rounded-full' onClick={() => setClientMenuisOpen(!clientMenuIsOpen)}>
                    {
                        clientMenuIsOpen ? <SVGIcon icon={filterNagtiveIcon} className='' /> : <SVGIcon icon={filterPlusIcon} className='' />           
                    }

                </span>
            </div>
            <div className={`mt-[18px] ${clientMenuIsOpen ? '' : 'hidden'}`}>
                <InputComponent label='Client Name' placeholder='Client Name' value={searchBySidebarFilter?.name} onChange={(e : React.ChangeEvent<InputEvent>) => setSearchBySidebarFilter({ ...searchBySidebarFilter , name : e.target.value})} />
            </div>
        </div>
    )
}

export default ClientMenu