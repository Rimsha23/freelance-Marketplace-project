import React, { useState } from 'react'
import MarkASDropDownButtonComponent from "../../app-components/MarkAsDropDownButton/MarkASDropDown";
import { BlackBillIcon, GreenBillIcon } from '../../pages/Notifications/NotificatonsIcons';
import SVGIcon from '../SVgicon';


type notificationsDemoArrayObj = {
    text: string;
    id: number;
    isRead: boolean;
}
type NotificationPropsType = {
    notification: notificationsDemoArrayObj;
}


const NotificationsCard: React.FC<NotificationPropsType> = ({ notification }) => {
    const [notifId, setNotifId] = useState<number | null>(null)
    const [markAsReadDropDown, setMarkAsReadDropDown] = useState<boolean>(false);

    const markAsReadDropDownHandle = (id: number) => {
        setNotifId(id)
        setMarkAsReadDropDown(!markAsReadDropDown)
    }

    return (
        <div key={notification.id} className="w-full h-[82px] flex justify-between items-center bg-white rounded-lg mb-3 md:px-7 px-3 relative">
            <div className="flex md:space-x-[20px] space-x-3 items-center">
                <span>
                    {
                        notification.isRead ? <SVGIcon icon={BlackBillIcon} /> : <SVGIcon icon={GreenBillIcon} />
                    }
                </span>
                <p className="md:text-[15px]">{notification.text}</p>
            </div>
            <div>
                <span
                    className="cursor-pointer"
                    onClick={() => markAsReadDropDownHandle(notification.id)}
                >
                    <svg
                        width="4"
                        height="20"
                        viewBox="0 0 4 20"
                        fill="#6EF5C3"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.99786 9.99265C4.00382 11.0768 3.0879 12.0041 2.00416 12.0101C0.926391 12.0161 0.00674182 11.0949 2.9062e-05 10.0039C-0.00593783 8.91898 0.90849 7.99321 1.99298 7.98721C3.07224 7.98045 3.99114 8.90096 3.99786 9.99265Z"
                            fill={`${notification.isRead ? '#CACACA' : '#6EF5C3'}`}
                        />
                        <path
                            d="M1.98577 19.9967C0.878912 19.9907 -0.0183611 19.0852 0.000285483 17.992C0.0189321 16.8883 0.919189 15.9993 2.01262 16.0053C3.10233 16.0113 4.01154 16.9333 3.99886 18.019C3.98469 19.131 3.09786 20.0027 1.98577 19.9967Z"
                            fill={`${notification.isRead ? '#CACACA' : '#6EF5C3'}`}
                        />
                        <path
                            d="M1.99449 -4.67063e-05C3.10508 -0.00229903 3.99565 0.879914 3.99863 1.98662C4.00161 3.07606 3.09315 3.98981 2.00419 3.99206C0.912993 3.99357 0.00826051 3.09258 5.60284e-05 1.99638C-0.00814845 0.897182 0.886142 0.00220586 1.99449 -4.67063e-05Z"
                            fill={`${notification.isRead ? '#CACACA' : '#6EF5C3'}`}
                        />
                    </svg>
                </span>
            </div>
            {/* //Mark AS Read Dropdown */}
            {
                notifId === notification.id && (
                    <MarkASDropDownButtonComponent markAsReadDropDown={markAsReadDropDown} />
                )
            }
        </div>
    )
}

export default NotificationsCard