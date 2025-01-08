
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
const ChooseAvatar = () => {
    const [selected, setselected] = useState(0)
    return (
        <div className='bg-[#F6F6F2]'>

      
        <div className=' max-w-[100%] lg:max-w-[80%] mx-auto mt-[71px] '>
            <h2 className='text-[40px] text-center leading-[48px] font-semibold'>Choose your assistant</h2>

            <div className='grid grid-col-1 md:grid-cols-3 mt-[100px] gap-[24px]'>
                <div className='flex flex-col'>

                    <div onClick={() => setselected(1)} className={`bg-[#FAFCFC]  flex-grow h-full ${selected === 1 ? 'select-shadow ' : 'inner-shadow'}  px-[53px] rounded-[16px] flex justify-center items-center`}>

                        <Image
                            src="/robot.svg"
                            width={204}
                            height={484}
                            alt='doctor'
                            

                        />

                    </div>
                    <h2 className=' text-center mt-[24px] font-bold text-[20px] leading-[24px]'>AI Chatbot</h2>
                </div>
                <div className='flex flex-col'>
                    <div onClick={() => setselected(2)} className={`bg-[#FAFCFC]  flex-grow h-full ${selected === 2 ? 'select-shadow' : 'inner-shadow'}  px-[53px] rounded-[16px] flex justify-center items-center`}>


                        <Image
                            src="/doctor3.svg"
                            width={204}
                            height={484}
                            alt='doctor'
                            className='h-full'
                        />
                    </div>
                    <h2 className=' text-center mt-[24px] font-bold text-[20px] leading-[24px]'>Medical Professional</h2>
                </div>
                <div className='flex flex-col'>
                    <div onClick={() => setselected(3)} className={`bg-[#FAFCFC]  flex-grow h-full ${selected === 3 ? 'select-shadow' : 'inner-shadow'}  px-[53px] rounded-[16px] flex justify-center items-center`}>


                        <Image
                            src="/student.svg"
                            width={204}
                            height={484}
                            alt='doctor'
                            className='h-full'
                        />
                    </div>
                    <h2 className=' text-center mt-[24px] font-bold text-[20px] leading-[24px]'>Medical Professional</h2>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>

                <Link href="/doctor">
                    <button className={`mt-[51px] ${selected == 0 ? 'bg-[#C9C7C7]' : 'bg-gradient-to-r from-[#28AAE1] via-[#0364B3] to-[#012B4D] '} flex items-center mb-[30px] text-[24px] leading-[29px] font-bold text-white px-[40px] py-[16px]  gap-2 rounded-[99px] `}>
                        Carry On
                        <Image
                            src="/arrow-right.svg"
                            width={28}
                            height={28}
                            alt="width"
                        />
                    </button>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default ChooseAvatar