import { Switch } from 'antd'
import React from 'react'

type NotificationDropDownProps = {
  notificationDropDown: boolean;
  className: string
}

const NotifDropDownComponent: React.FC<NotificationDropDownProps> = ({ notificationDropDown, className }) => {
  return (
    <div className={`absolute ${className} md:w-[371px] w-full border px-[19px] bg-white rounded-lg py-[24px] z-10 md:text-[15px] khula-text ${notificationDropDown ? '' : 'hidden'}`}>
      {/* 1 */}
      <div className="flex justify-between">
        <div>
          <p>Receive via SMS</p>
        </div>
        <div>
          <Switch className='bg-[#808080]' />
        </div>
      </div>
      {/* 2 */}
      <div className="flex justify-between mt-[22px]">
        <div>
          <p>Receive via Email</p>
        </div>
        <div>
          <Switch className='bg-[#808080]' />
        </div>
      </div>
      {/* 3 */}
      <div className="flex justify-between mt-[22px]">
        <div>
          <p>Receive only in-app</p>
        </div>
        <div>
          <Switch className='bg-[#808080]' />
        </div>
      </div>
    </div>
  )
}

export default NotifDropDownComponent