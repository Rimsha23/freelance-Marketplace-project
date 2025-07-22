import React from 'react'
import SideComp from '../../app-components/public-page-side-logo'
import { Growtal2 } from '../../utils/constants'
import Forgotform from './forgotform'
const ForgotPassword: React.FC = () => {
    return (
        <div className='relative bg-silogin full-page '>
            <div className='flex flex-col md:flex-col lg:flex-row lg:space-x-60 lg:space-y-28 xl:space-y-52  xl:space-x-[480px]'>
                <div className='md:-mt-28'>
                    <SideComp />
                </div>
                <div className='mt-40 md:-mt-8' >
                    < Forgotform />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <img src={Growtal2} className='absolute bottom-2 lg:bottom-0 lg:right-0 lg:mx-10 lg:my-10 w-44 md:w-40 lg:w-52 xl:w-64' />
            </div>

        </div>
    )
}

export default ForgotPassword