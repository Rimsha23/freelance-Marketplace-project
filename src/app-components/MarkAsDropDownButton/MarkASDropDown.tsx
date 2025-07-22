import { Button } from 'antd'
import React from 'react'

type MarkAsReadDropDownProps = {
  markAsReadDropDown: boolean;
}

const MarkASDropDownButtonComponent: React.FC<MarkAsReadDropDownProps> = ({ markAsReadDropDown }) => {
  return (
    <div
      className={`absolute -bottom-8 right-2 bg-white w-[145px] h-[48px] border rounded-md flex items-center z-10 ${markAsReadDropDown ? "" : "hidden"
        }`}
    >
      <Button
        type="text"
        className=" w-full h-full md:text-[15px] khula-text "
      >
        Mark as Read
      </Button>
    </div>
  )
}

export default MarkASDropDownButtonComponent