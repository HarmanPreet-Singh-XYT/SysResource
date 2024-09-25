'use client'
import React from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
interface props{
    name:string,
    ip:string,
    domain:string,
    isRunning:boolean,
    uptime:string,
    type:'Production'|'Development'|'Other',
    cpuUsage:number,
    availMemory:number,
    totalMemory:number,
    usedMemory:number,
    platform:string,
    environment:string
}
const Server = ({name,ip,domain,isRunning,uptime,type,cpuUsage,availMemory,usedMemory,totalMemory,platform,environment}:props) => {
  return (
    <div className='h-[335px] w-[940px] border-[1px] border-black rounded-[10px] overflow-hidden'>
        <div className='w-full h-[85%] bg-black flex'>
            <div className='w-[40%] h-full px-8 flex flex-col justify-evenly'>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>Name</h1>
                    <p className='text-white font-medium text-[18px]'>{name}</p>
                </div>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>IP</h1>
                    <p className='text-white font-medium text-[18px]'>{ip}</p>
                </div>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>Domain</h1>
                    <p className='text-white font-medium text-[18px]'>{domain}</p>
                </div>
            </div>
            <div className='w-[1px] bg-white h-full'></div>
            <div className='w-[20%] h-full px-4 flex flex-col justify-evenly'>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>Status</h1>
                    <div className='flex items-center gap-8'>
                        <p className='text-white font-medium text-[18px]'>{isRunning ? 'Running' : 'Stopped'}</p>
                        <div className={`h-[25px] w-[25px] ${isRunning ? 'bg-[#008000]' : 'bg-red-500'} rounded-full`}></div>
                    </div>
                </div>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>Uptime</h1>
                    <p className='text-white font-medium text-[18px]'>{uptime}</p>
                </div>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>Type</h1>
                    <p className='text-white font-medium text-[18px]'>{type}</p>
                </div>
            </div>
            <div className='w-[1px] bg-white h-full'></div>
            <div className='w-[40%] h-full px-4 flex flex-col justify-evenly'>
                <div className='flex gap-[100px]'>
                    <div>
                        <h1 className='text-white font-bold text-[16px]'>CPU Usage</h1>
                        <div className='w-[75px] h-[75px]'>
                            <Progressbar percentage={cpuUsage}/>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-white font-bold text-[16px]'>Available memory</h1>
                        <div className='w-[75px] h-[75px]'>
                            <Progressbar percentage={availMemory*100/totalMemory}/>
                        </div>
                    </div>
                </div>
                <div className='flex gap-20'>
                    <div>
                        <h1 className='text-white font-bold text-[16px]'>Used memory</h1>
                        <div className='w-[75px] h-[75px]'>
                            <Progressbar percentage={usedMemory*100/totalMemory}/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <h1 className='text-white font-bold'>Platform</h1>
                            <h2 className='text-white font-medium'>{platform}</h2>
                        </div>
                        <div>
                            <h1 className='text-white font-bold'>Environment</h1>
                            <h2 className='text-white font-medium'>{environment}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full h-[15%] flex'>
            <button className='w-[40%] h-full flex justify-center items-center'>
                <h1 className='text-center font-bold'>View Details</h1>
            </button>
            <div className='w-[1px] bg-black h-full'></div>
            <button className='w-[20%] h-full flex justify-center items-center'>
                <h1 className='text-center font-bold'>Modify</h1>
            </button>
            <div className='w-[1px] bg-black h-full'></div>
            <button className='w-[40%] h-full flex justify-center items-center'>
                <h1 className='text-center font-bold'>Remove</h1>
            </button>
        </div>
    </div>
  )
}
const Progressbar = ({percentage}:{percentage:number})=>{
    return (
        <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={20} styles={buildStyles({pathColor: `#068FFF`,trailColor:'#FFFFFF',textColor:'white',strokeLinecap:'butt'})}/>
    )
}
export default Server