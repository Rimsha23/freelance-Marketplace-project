import React, {useState} from 'react'
import ButtonComp from '../../common-components/button';
import { Modals } from '../../common-components/modal';
import image from '../../assets/images/del.png'
import SettingsSidebar from '../../app-components/Settings-sidebar';
import { useDispatch } from 'react-redux';
import { userId } from '../../utils/constants';
import { fetchApiData } from '../../store/accountSlice';

const SettingDeleteAccount: React.FC = () => {
    const[isModalOpen, setIsModalOpen] = useState(true)
    const dispatch = useDispatch();

    const handleDeleteAccount = () => {
      dispatch(fetchApiData(userId));
      setIsModalOpen(false);
    };
  return (
    <div className='flex'>
      <SettingsSidebar/>
     <div>
        {isModalOpen &&(
        <Modals  width='440px' height='527px' open={isModalOpen} onClose={()=> setIsModalOpen(true)}>
          <div className='flex justify-center items-center pt-14'>
            <img src={image} alt='image1' className='w-[90px] h-[90px]'/>
           </div>
           <div className="text-stone-300 text-[22px] flex justify-center items-center font-bold libre-caslon-text">Delete Account</div>
           <div className='text-black text-[15px] font-normal   pt-8 px-5'>
            <p>“By deleting youraccount, you understand that you will lose access to all historical account information, will no longer be able toreceive payments, and will no longer beeligible for new project engagements</p>
            <div className='flex items-center justify-center gap-2 text-center'>
              <ButtonComp  onClick={()=> setIsModalOpen(false)} className='mt-9 w-28 h-[49px]'  text='Cancel' htmlType='submit'></ButtonComp>
              <ButtonComp onClick={handleDeleteAccount} className='mt-9 w-[199px] h-[49px]' variant='violet' text='Yes, Delete Account' htmlType='submit' ></ButtonComp>
            </div>
           </div>

        </Modals>
        )}
        </div> 
        </div>
        
  
  
  )
}

export default SettingDeleteAccount;
