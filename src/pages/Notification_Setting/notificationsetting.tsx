import { Switch } from 'antd'
import React from 'react'
import SettingsSidebar from '../../app-components/Settings-sidebar';
const NotificatinSetting: React.FC = () => {
  return (
    <>
<div className='flex'>
    <SettingsSidebar/>

    <div  className="w-[755px] h-[200px] mt-28 ml-4 bg-white rounded-lg border-2 border-neutral-200">
        <div className=' text-[15px] ml-6 pb-6   pt-14'>
      {/* 1 */}
      <div className="flex justify-between">
        <div>
          <p>Receive via SMS</p>
        </div>
        <div>
          <Switch className='bg-[#808080] mr-5' />
        </div>
      </div>
      {/* 2 */}
      <div className="flex justify-between mt-[22px]">
        <div>
          <p>Receive via Email</p>
        </div>
        <div>
          <Switch className='bg-[#808080] mr-5' />
        </div>
      </div>
      {/* 3 */}
      <div className="flex justify-between mt-[22px]">
        <div>
          <p>Receive only in-app</p>
        </div>
        <div>
          <Switch className='bg-[#808080] mr-5' />
        </div>
      </div>
    </div>
    </div>
    </div>
   
    
    </>
  )
}


export default NotificatinSetting;

