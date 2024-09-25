import React from 'react'

const BottomBtns = () => {
  return (
    <div>
        <button className='w-[280px] mx-auto min-h-[38px] flex border-[1px] border-[#000000] justify-center rounded-[10px] items-center px-4'>
            <h2 className='font-bold text-black text-[14px]'>Add Server</h2>
        </button>
        <button className='w-[280px] mx-auto min-h-[38px] flex mt-2 border-[1px] border-[#000000] justify-center rounded-[10px] items-center px-4'>
            <h2 className='font-bold text-black text-[14px]'>Generate Key</h2>
        </button>
        <button className='w-[280px] mx-auto min-h-[38px] flex border-[1px] border-[#000000] justify-center mt-2 rounded-[10px] items-center px-4'>
            <h2 className='font-bold text-black text-[14px]'>Export/Import Data</h2>
        </button>
    </div>
  )
}

export default BottomBtns