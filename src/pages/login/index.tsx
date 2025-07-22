import React from 'react'
import './index.css'
import { Growtal2 } from '../../utils/constants';
import { LoginForm } from './loginform';
import SideComp from '../../app-components/public-page-side-logo';
export const Login: React.FC = () => {
  return (
    <div className='relative bg-silogin full-page'>
      <div className='flex sm:flex-col flex-col md:space-x-0 lg:flex-row lg:space-x-80 xl:space-x-[550px]'>
        <div className='md:-mt-28'>
          <SideComp />
        </div>
        <div className='mt-10 mb-32 lg:mt-5 md:-mt-20'>
          <LoginForm />
        </div>
      </div>
      <img src={Growtal2} className='absolute bottom-0 mt-36 right-0 mx-4 my-4 w-28 md:w-32 lg:w-36 xl:w-52' />
    </div>
  );
};