import React from 'react'

function OfferCards() {
    return (
        <div className='py-10'>
            <div className='flex justify-center flex-wrap  gap-4' >
            <div className='bg-gray-200 w-full lg:w-fit  flex justify-center items-center px-4' >
                <div>
                    <h1 className='font-bold text-xl mb-4'>Porto Watches <br /> <span className='line-through'>20%</span> <span className='text-3xl text-[#0371a8] font-extrabold'>30%OFF</span>  </h1>
                    <button className='bg-gray-900 text-white font-bold px-4 py-2 cursor-pointer'>SHOP NOW</button>
                </div>

                <img width={200} src="https://parspng.com/wp-content/uploads/2023/06/watchpng.parspng.com-10.png" alt="" />
            </div>
            <div className='px-3 w-full lg:w-fit  bg-gray-200   flex justify-center items-center'>
                <div className='flex gap-4  rounded py-10 px-4 h-full items-center'>
                <div>
                    <h1 className='font-bold text-xl'>DEAL PROMOS</h1>
                    <p className='text-gray-600 font-semibold'>STARTING AT $99</p>
                </div>
                <button className='bg-gray-900 text-white font-bold px-4 py-2 cursor-pointer'>SHOP NOW</button>


            </div>
            </div>
            <div className='flex w-full lg:w-fit items-center justify-center gap-4 bg-gray-200 px-4'>
               
                <img width={200} src="https://static.vecteezy.com/system/resources/previews/037/210/932/non_2x/ai-generated-woman-handy-purse-on-transparent-background-ai-generated-png.png" alt="" />
                 <div className='space-y-1.5'>
                    <h1 className='font-bold text-2xl'>Handbags</h1>
                    <p className='text-red-400 font-semibold'>STARTING AT $99</p>
                    <button className='bg-gray-900 text-white font-bold px-4 py-2 cursor-pointer'>SHOP NOW</button>


                </div>
            </div>
            </div>
        </div>
    )
}

export default OfferCards
