import React from 'react'
import "./signup.css"
import { SignUpForm } from './signupform';
import { Growtal2 } from '../../utils/constants';
import SideComp from '../../app-components/public-page-side-logo';
const SignUp: React.FC = () => {
    return (
        <div className='relative bg-signup full-page '>
            <div className='flex sm:flex-col flex-col md:space-x-0 lg:flex-row lg:space-x-72 xl:space-x-[400px]'>
                <div className='md:-mt-28'>
                    <SideComp />
                </div>
                <div className='mt-10 mb-32 lg:mt-5 md:-mt-20'>
                    <SignUpForm />
                </div>
            </div>
            <img src={Growtal2} className='absolute right-0 bottom-0 md:mx-4 md:my-4 w-20 md:w-32 lg:w-36 xl:w-52' />
        </div>
    );
};
export default SignUp