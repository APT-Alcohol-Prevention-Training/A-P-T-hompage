import React from 'react'
import Abouta from '../assets/AAA.png'
import Aboutb from '../assets/Aa.png'
import Aboutc from '../assets/Ab.png'
import Aboutd from '../assets/Ac.png'
import Aboute from '../assets/Ad.png'


const Aboutus = () => {
  return (
    <>
    <div className='relative w-[1440px] h-[765px] mt-[150px] bg-[#F9FAF9]'>
        <div className='absolute w-[1263px] h-[557px] ml-[89px] top-[104px] '>
            <div className=' w-[1260px] h-[103px] flex justify-between '>
                <div className='mt-[28px]'>
                    <h1 className='text-[48px] font-[700] leading-[130%] tracking-[-3%] -400 w-[220px]'>About Us</h1></div>
                <div className=' w-[872px] h-[95px] mt-[17px]'>
                    <p className='text-[18px] font-[600] leading-[180%]'>LeafAI Search sprouted from a simple idea: make enterprise knowledge as easy to find as a Google search. We're a team of A I enthusiasts, search experts, and UX designers on a mission to revolutionize how organizations discover and utilize their collective knowledge.
                    </p>
                </div>
            </div>
            <div className=' w-[1263px] h-[382px] mt-[72px] flex justify-between'>
                <div className='w-[438px] h-[382px]  rounded-[30px]'>
                    <img src={Abouta}alt='abouta' className='object-cover'/>
                </div>
                <div className=' w-[801px] h-[382px] rounded-[15px] relative'>
                    <img src={Aboutb}alt='aboutb' className='object-cover w-[801px] h-[382px]' />
                    <img src={Aboutc} alt='aboutc' className='w-[279px] h-[275px] absolute top-[54px] left-[24px] '/>
                    <img src={Aboutd} alt='aboutd' className='w-[285px] h-[133px] absolute top-[137px] left-[340px]'/>
                    <img src={Aboute} alt='aboute' className='w-[82px] h-[82px] absolute top-[160px] left-[620px]'/>
                    
                </div>

            </div>
        </div>

    </div>
    </>
  )
}

export default Aboutus