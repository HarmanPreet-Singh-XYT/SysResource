import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
        <h1 className='text-3xl font-bold px-2'>Cloud is currently not available at this time.</h1>
        <div className='flex mt-8 flex-col'>
            <h1 className='text-lg font-bold'>Join Wishlist & Get Notification on availability</h1>
            <div className='flex mt-4 justify-between'>
                <input type='email' placeholder='Email' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] px-4 py-2'/>
                <button className='px-4 py-2 bg-black text-white rounded-[10px]'>Notify Me</button>
            </div>
        </div>
    </div>
  )
}

export default page