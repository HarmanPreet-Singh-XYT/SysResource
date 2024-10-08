'use client'
import useDB from '@/controller/LocalDatabase';
import { useData } from '@/helpers/Data';
import React, {  useState } from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
interface props{
    id:number;
    name:string,
    ip?:string,
    domain?:string,
    isRunning:boolean,
    uptime:string,
    type:string,
    cpuUsage:number,
    availMemory:number,
    totalMemory:number,
    usedMemory:number,
    platform:string,
    environment:string
    setPopup:(type:string)=>void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setParams:(id:number)=>void
}
const MobileServer = ({id,name,ip,domain,isRunning,uptime,type,cpuUsage,availMemory,usedMemory,totalMemory,platform,environment,setPopup,setParams}:props) => {
    const {removeServerDB} = useDB();
    const {removeData,setServerID} = useData();
    const [popup, setpopup] = useState({delete:false});
    const getPercentage = (value:number)=>{
        const valueOutput = Math.round((value / totalMemory) * 100);
        return (valueOutput > -1) ? valueOutput : 0;
    }
    const openPopup = (type:string) => {
        switch (type) {
            case 'delete':
                setpopup({delete:true});
                break;
            case 'close':
                setpopup({delete:false});
                break;
        }
    }
    const removeServer = () => {
        removeData(id);
        removeServerDB(id);
        openPopup('close');
    }
    const selectServer = (id:number,action:string)=>{
        setParams(id);
        setServerID(id);
        setPopup(action);
    }
    return (
    <div className='min-h-[435px] ml-2 w-full border-[1px] relative border-black rounded-[10px] overflow-hidden'>
        {(popup.delete) &&
            <div onClick={() => openPopup('close')} className='absolute h-full w-full bg-black opacity-60'></div>
        }
        {popup.delete && 
        (<div className='absolute z-20 top-0 bottom-0 left-0 right-0 self-center mx-auto w-full h-[140px] bg-black border-[1px] border-white rounded-[10px] flex flex-col items-center justify-between'>
            <div className='h-[60%] flex justify-center items-center'>
                <h1 className='text-white font-bold text-[16px]'>Are you sure you want to delete this server?</h1>
            </div>
            <div className='h-[40%] w-full flex justify-evenly'>
                <button onClick={() => openPopup('close')} className='w-[120px] h-[40px] bg-white font-bold text-black rounded-[10px] hover:bg-black hover:text-white transition-colors duration-100 hover:border-[1px] hover:border-[#ffffff]'>Cancel</button>
                <button onClick={removeServer} className='w-[120px] h-[40px] bg-white font-bold text-black rounded-[10px] hover:bg-black hover:text-white transition-colors duration-100 hover:border-[1px] hover:border-[#ffffff]'>Delete</button>
            </div>
        </div>)
        }
        <div className='w-full h-[85%] bg-black flex flex-col'>
            <div className='w-full h-[25%] px-4 flex justify-between items-center'>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>Name</h1>
                    <p className='text-white font-medium text-[18px]'>{name}</p>
                </div>
                <div className='w-[1px] bg-white h-full'></div>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>IP</h1>
                    <p className='text-white font-medium text-[18px]'>{ip}</p>
                </div>
                <div className='w-[1px] bg-white h-full'></div>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>Domain</h1>
                    <p className='text-white font-medium text-[18px]'>{domain}</p>
                </div>
            </div>
            <div className='w-full bg-white h-[1px]'></div>
            <div className='w-full h-[25%] px-4 flex justify-between items-center'>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>Status</h1>
                    <div className='flex items-center gap-2'>
                        <p className='text-white font-medium text-[18px]'>{isRunning ? 'Running' : 'Stopped'}</p>
                        <div className={`h-[25px] w-[25px] ${isRunning ? 'bg-[#008000]' : 'bg-red-500'} rounded-full`}></div>
                    </div>
                </div>
                <div className='w-[1px] bg-white h-full'></div>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>Uptime</h1>
                    <p className='text-white font-medium text-[18px]'>{uptime}</p>
                </div>
                <div className='w-[1px] bg-white h-full'></div>
                <div>
                    <h1 className='text-white font-bold text-[16px]'>Type</h1>
                    <p className='text-white font-medium text-[18px]'>{type}</p>
                </div>
            </div>
            <div className='w-full bg-white h-[1px]'></div>
            <div className='w-full h-[35%] px-4 flex justify-between items-center'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-white font-bold text-[16px]'>CPU Usage</h1>
                        <div className='w-[75px] h-[75px]'>
                            <Progressbar percentage={cpuUsage}/>
                        </div>
                    </div>
                    <div className='w-[1px] bg-white h-full'></div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-white font-bold text-[16px]'>Free memory</h1>
                        <div className='w-[75px] h-[75px]'>
                            <Progressbar percentage={getPercentage(availMemory)}/>
                        </div>
                    </div>
                    <div className='w-[1px] bg-white h-full'></div>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-white font-bold text-[16px]'>Used memory</h1>
                        <div className='w-[75px] h-[75px]'>
                            <Progressbar percentage={getPercentage(usedMemory)}/>
                        </div>
                    </div>
            </div>
            <div className='w-full bg-white h-[1px]'></div>
            <div className='w-full h-[20%] px-4 flex justify-between items-center'>
                <div>
                    <h1 className='text-white font-bold'>Platform</h1>
                    <h2 className='text-white font-medium'>{platform}</h2>
                </div>
                <div className='w-[1px] bg-white h-full'></div>
                <div>
                    <h1 className='text-white font-bold'>Environment</h1>
                    <h2 className='text-white font-medium'>{environment}</h2>
                </div>
            </div>
        </div>
        <div className='w-full h-[15%] flex'>
            <button onClick={()=>selectServer(id,'details')} className='w-[40%] transition-colors duration-100 hover:border-[1px] hover:border-white hover:bg-black hover:text-white h-full flex justify-center items-center text-center font-bold'>
                View Details
            </button>
            <div className='w-[1px] bg-black h-full'></div>
            <button onClick={()=>selectServer(id,'modify')} className='w-[20%] transition-colors duration-100 hover:border-[1px] hover:border-white hover:bg-black hover:text-white h-full flex justify-center items-center text-center font-bold'>
                Modify
            </button>
            <div className='w-[1px] bg-black h-full'></div>
            <button onClick={()=>openPopup('delete')} className='w-[40%] transition-colors duration-100 hover:border-[1px] hover:border-white hover:bg-black hover:text-white h-full flex justify-center items-center text-center font-bold'>
                Remove
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
export default MobileServer