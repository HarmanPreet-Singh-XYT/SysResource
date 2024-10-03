import React from 'react'
import CpuUsageChart from './Details/CpuUsageChart'
import MemoryUsageChart from './Details/MemoryUsageChart'

const Details = () => {
  return (
    <div className='absolute z-20 top-20 flex flex-col gap-2 left-0 right-0 bottom-0 self-center mx-auto w-full h-[700px] bg-white border-[1px] border-[#CCCCCC] rounded-[10px] py-6 shadow-lg px-6'>
      <div className='flex justify-between h-[50%] w-full'>
        <div className='w-[50%] h-[325px]'>
          <CpuUsageChart/>
        </div>
        <div className='w-[50%] h-[325px]'>
          <MemoryUsageChart/>
        </div>
      </div>
      <div className='flex h-[50%] w-full justify-between'>
        <div className='flex flex-col justify-between'>
          <div className='h-[48%] w-[520px] rounded-[10px] px-4 justify-evenly flex flex-col border-[1px] border-black'>
            <p className='text-sm font-medium'>Processor - Intel i7 12900k @ 4.8GHZ</p>
            <p className='text-sm font-medium'>Architecture - x64</p>
            <p className='text-sm font-medium'>CPU Cores - 8</p>
            <p className='text-sm font-medium'>Machine - x86_64</p>
            <p className='text-sm font-medium'>Uptime - 2925 Minutes</p>
          </div>
          <div className='h-[48%] w-[520px] rounded-[10px] border-[1px] px-4 border-black flex justify-between'>
            <div className='flex flex-col justify-evenly'>
              <p className='text-sm font-medium'>Environment - Node.js</p>
              <p className='text-sm font-medium'>Hostname - DESKTOP-S2</p>
              <p className='text-sm font-medium'>Release - 10.0.19045</p>
              <p className='text-sm font-medium'>Platform Type - win32</p>
            </div>
            <div className='flex flex-col justify-evenly'>
              <p className='text-sm font-medium'>Free Memory - 16384 MB</p>
              <p className='text-sm font-medium'>Used Memory - 16384 MB</p>
              <p className='text-sm font-medium'>Total Memory - 16385 MB</p>
              <p className='text-sm font-medium'>Platform - Windows NT</p>
            </div>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Details