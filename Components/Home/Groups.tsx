import React from 'react'

const Groups = () => {
    const array = ['South East Asia','Middle-East','Europe','North America','South America','Africa','Australia'];
  return (
    <div className='w-[320px] h-auto min-h-[425px] max-h-[425px] border-[1px] border-[#CCCCCC] rounded-[10px] px-5 py-4'>
        <h1 className='font-bold'>Groups</h1>
        <div className='flex flex-col gap-2 mt-3 h-[275px] overflow-auto'>
            <div className='w-full min-h-[38px] flex bg-black rounded-[10px] items-center px-4'>
                <h2 className='font-bold text-white'>All</h2>
            </div>
            {array.map((item,index) => (
                <button key={index} className='w-full min-h-[38px] flex border-[1px] border-[#CCCCCC] rounded-[10px] items-center px-4'>
                    <h2 className='font-medium text-black text-[14px]'>{item}</h2>
                </button>
            ))}
        </div>
        <div className='w-full min-h-[38px] flex border-[1px] border-[#000000] justify-center mt-10 rounded-[10px] items-center px-4'>
                    <h2 className='font-bold text-black text-[14px]'>Create a Group</h2>
        </div>
    </div>
  )
}

export default Groups