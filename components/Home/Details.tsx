'use client'
import React, { useEffect, useState } from 'react'
import CpuUsageChart from './Details/CpuUsageChart'
import MemoryUsageChart from './Details/MemoryUsageChart'
import { useData } from '@/helpers/Data';
interface SystemInfo {
  checked:boolean;
  hostname: string;
  cpu: string;
  cpuCore: number;
  release: string;
  platform: string;
  uptime: number;  // in minutes
  type: string;
  machine: string;
  architecture: string;
  environment: string;
  name: string;
  ip?: string;  // optional
  domain?: string;  // optional
  isRunning: boolean;
  connectivityMedium: string;
  path: string;
  groupName: string;
  connectionType: string;
}
const Details = ({serverID,setPopup}:{serverID:number,setPopup:(type:string)=>void}) => {
  const {data,groups} = useData();
  const [serverDetails, setserverDetails] = useState<SystemInfo>({
    checked:false,
    hostname: 'checking...',
    cpu: 'checking...',
    cpuCore: 0,
    release: 'checking...',
    platform: 'checking...',
    uptime: 0,  // in minutes
    type: 'checking...',
    machine: 'checking...',
    architecture: 'checking...',
    environment:'checking...',
    name: 'checking...',
    ip: 'checking...',
    domain: 'checking...',
    isRunning: false,
    connectivityMedium:'checking...',
    path:'checking...',
    groupName:'checking...',
    connectionType:'checking...'
  });
  useEffect(() => {
    if(!serverDetails.checked){

    }
  }, [data])
  
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
        <div className='flex flex-col w-[40%] justify-between'>
          <div className='h-[48%] w-full rounded-[10px] px-4 justify-evenly flex flex-col border-[1px] border-black'>
            <p className='text-sm font-medium'>Processor - Intel i7 12900k @ 4.8GHZ</p>
            <p className='text-sm font-medium'>Architecture - x64</p>
            <p className='text-sm font-medium'>CPU Cores - 8</p>
            <p className='text-sm font-medium'>Machine - x86_64</p>
            <p className='text-sm font-medium'>Uptime - 2925 Minutes</p>
          </div>
          <div className='h-[48%] w-full rounded-[10px] border-[1px] px-4 border-black flex justify-between'>
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
        <div className='w-[25%]'>
          <div className='h-full w-full bg-white border-[1px] border-black rounded-[10px] px-4 py-2'>
            <div className='flex flex-col justify-evenly h-full'>
              <p className='text-sm font-medium'>Name - Main Server</p>
              <p className='text-sm font-medium'>IP - 192.168.1.1</p>
              <p className='text-sm font-medium'>Domain - https://localhost:4000</p>
              <p className='text-sm font-medium'>Connectivity Medium - Domain</p>
              <p className='text-sm font-medium'>Connection Type - WebSocket</p>
              <p className='text-sm font-medium'>Type - Production</p>
              <p className='text-sm font-medium'>Group - All</p>
              <p className='text-sm font-medium'>URL Path - /sysresource</p>
              
            </div>
          </div>
        </div>
        <div className='w-[32%]'>
          <div className='h-full w-full bg-black rounded-[10px] px-4 py-2'>
            <h1 className='text-end text-white text-sm font-medium'>Error Logs</h1>
            <div className='h-[90%] w-full flex items-end overflow-auto'>
              <h1 className='text-end text-white text-sm font-medium'>10/10/2024 10:10:10 API: Fetch Failed</h1>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Details