'use client'
import React, { useState } from 'react'
import Integration from './Documentation/Integration'
import Unsupported from './Documentation/Unsupported';
import Contribution from './Documentation/Contribution';

const Docs = () => {
    const [selectedSection, setselectedSection] = useState<'integration'|'unsupported'|'contribution'>('integration');
  return (
    <div className='flex flex-col px-4 items-center h-full w-full'>
        <div className='flex my-4 justify-center items-center lg:w-[720px] w-full border-[1px] h-[75px] rounded-[10px] border-black'>
            <h1 className='text-3xl font-bold text-center'>Documentation</h1>
        </div>
        <div className='flex lg:w-[720px] w-full h-auto mb-2 justify-between'>
            <button onClick={()=>setselectedSection('integration')} className={`flex justify-center items-center px-8 font-bold text-sm py-2 ${selectedSection==='integration' ? 'bg-black text-white' : 'border-[1px] border-black'} rounded-[10px]`}>Integration</button>
            <button onClick={()=>setselectedSection('unsupported')} className={`flex justify-center items-center px-2 font-bold text-sm py-2 ${selectedSection==='unsupported' ? 'bg-black text-white' : 'border-[1px] border-black'} border-[1px] border-black rounded-[10px]`}>Unsupported Platform</button>
            <button onClick={()=>setselectedSection('contribution')} className={`flex justify-center items-center px-2 font-bold text-sm py-2 ${selectedSection==='contribution' ? 'bg-black text-white' : 'border-[1px] border-black'} border-[1px] border-black rounded-[10px]`}>Contributing Support</button>
        </div>
        <div className='h-auto rounded-[10px] bg-[#F5F5F5] lg:w-[720px] w-full'>
            {selectedSection==='integration' && <Integration/>}
            {selectedSection==='unsupported' && <Unsupported/>}
            {selectedSection==='contribution' && <Contribution/>}
        </div>
    </div>
  )
}

export default Docs