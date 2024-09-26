import React from 'react'

const BottomBtns = ({setPopup}:{setPopup:(type:string)=>void}) => {
  return (
    <div>
        <button onClick={()=>setPopup('create')} className='w-[280px] transition-colors duration-100 font-bold text-black text-[14px] hover:bg-black hover:text-white mx-auto min-h-[38px] flex border-[1px] border-[#000000] justify-center rounded-[10px] items-center px-4'>
            Add Server
        </button>
        <button onClick={()=>setPopup('settings')} className='w-[280px] transition-colors duration-100 font-bold text-black text-[14px] hover:bg-black hover:text-white mx-auto min-h-[38px] flex border-[1px] border-[#000000] justify-center mt-2 rounded-[10px] items-center px-4'>
            Settings
        </button>
    </div>
  )
}

export default BottomBtns