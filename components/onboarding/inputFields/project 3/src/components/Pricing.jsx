import React from 'react'
import Price1 from '../assets/Prica.png'
import Price2 from '../assets/Pricb.png'
import Last from '../assets/Footer.png'

const Pricing = () => {
  return (
    <>
    <div className='w-[1440px] h-[1064px]'>
        <div className='w-[458px] h-[234px] mt-[133px] ml-[491px]'>
            <img src={Price1} alt='price'/>
        </div>
        <div className='w-[1172px] h-[471px] mt-[70px] ml-[149px]'>
            <img src={Price2} alt='price'/>

        </div>
    </div>
    <div className='w-[1256px] h-[708px] ml-[92px]'>
        <img src={Last} alt=''/>

    </div>
    </>
  )
}

export default Pricing