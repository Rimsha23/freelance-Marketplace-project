import React from 'react'
import { Gshape1, Gshape2, growtal1 } from '../../utils/constants'
import "./index.css"
const SideComp: React.FC = () => {
    return (
        <div>
            <div className='mt-12 md:mt-48 lg:mt-80'>
                <div className="relative" >
                    <div
                        className=" w-[90px] h-[100px] md:w-[120px] md:h-[200px] lg:w-[200px] lg:h-[260px]"
                    >
                        <img src={Gshape1} />
                    </div>
                    <div
                        className="absolute -bottom-[64px] left-8 w-[60px] h-[100px] md:top-20 md:left-10 md:w-[80px] md:h-[90px]  lg:top-[135px] lg:left-14  lg:w-[145px] lg:h-[150px]"
                    >
                        <img src={Gshape2} />

                    </div>
                </div>
                <div className='absolute top-3 left-9 md:left-10 md:top-6 lg:top-32 lg:left-20'><img src={growtal1} className='w-[136px] h-[136px] md:w-[190px] md:h-[190px] lg:w-[300px] lg:h-[300px]' /></div>
            </div>
            <div className='absolute top-[170px] w-[270px] md:left-72 md:top-20 md:w-[400px] lg:left-16 lg:top-[500px]'>
                <p className='style2 md:text-2xl md:leading-1 xl:text-[30px] xl:leading-[34px] font-bold'>GrowTal is the #1 platform
                    to hire freelance marketing
                    experts on-demand.</p>
            </div>
        </div>
    )
}

export default SideComp