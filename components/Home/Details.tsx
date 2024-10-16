'use client'
import React, { useEffect, useRef, useState } from 'react'
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
  serverPlatform:string;
}
interface Errors{
  time:string;
  error:string;
}
const Details = ({setPopup}:{setPopup:(type:string)=>void}) => {
  const [cpuData, setCpuData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]); // Initial Data
  const [labels, setLabels] = useState<string[]>(['0', '0', '0', '0', '0', '0', '0']); // Initial Labels
  const [memoryData, setMemoryData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]); // Initial Memory Usage in MB
  const [memLabels, setMemLabels] = useState<string[]>(['0', '0', '0', '0', '0', '0', '0']); // Initial Labels
  const errorsList = useRef<Errors[]>([]);
  const {data,groups,selectedServerID,errors,serverSystemInfo} = useData();
  const [serverDetails, setserverDetails] = useState<SystemInfo>({
    checked:false,
    hostname: 'checking...',
    cpu: 'checking...',
    cpuCore: 0,
    release: 'checking...',
    platform: 'checking...',
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
    connectionType:'checking...',
    serverPlatform:'checking...'
  });
  const dynamicServerDetails = useRef({
    cpuUsage:0,
    freeMemory:0,
    usedMemory:0,
    totalMemory:0,
    uptime:'checking...',
  });
  useEffect(() => {
    if(!serverDetails.checked){
      const data1 = data.find((each) => (each.id === selectedServerID && each.isRunning));
      const groupName = groups.find((group) => group.id === selectedServerID)?.name;
      const APIData = serverSystemInfo.find((each) => each.id === selectedServerID);
      const errorlist = errors.find((each) => each.id === selectedServerID)?.errors;

      setserverDetails({
        checked: data1?.isRunning || false,
        hostname: APIData?.serverInfo?.hostname || 'N/A',
        cpu: APIData?.serverInfo?.cpu || 'N/A',
        cpuCore: APIData?.serverInfo?.cpuCore || 0,
        release: APIData?.serverInfo?.release || 'N/A',
        platform: data1?.platform || 'N/A',
        type: data1?.type || 'N/A',
        machine: APIData?.serverInfo?.machine || 'N/A',
        architecture: APIData?.serverInfo?.architecture || 'N/A',
        environment: data1?.environment || 'N/A',
        name: data1?.name || 'N/A',
        ip: data1?.ip || 'N/A',
        domain: data1?.domain || 'N/A',
        isRunning: data1?.isRunning || false,
        connectivityMedium: data1?.connectivityMedium || 'N/A',
        path: data1?.urlPath || 'N/A',
        groupName: groupName || 'All',
        connectionType: data1?.connectionType || 'N/A',
        serverPlatform: APIData?.serverInfo?.platform || 'N/A',
      });
      errorsList.current = errorlist || [];
    }
    const errorlist = errors.find((each) => each.id === selectedServerID)?.errors;
    errorsList.current = errorlist || [];
    const datafilter = data.find((each) => each.id === selectedServerID && each.isRunning);
    dynamicServerDetails.current = {
      cpuUsage:datafilter?.cpuUsage || 0,
      freeMemory: datafilter?.availMemory || 0,
      usedMemory: datafilter?.usedMemory || 0,
      totalMemory: datafilter?.totalMemory || 0,
      uptime: datafilter?.uptime || 'N/A',
    }
    const newCpuUsage = dynamicServerDetails.current.cpuUsage; // Mock CPU usage value
    setCpuData((prevData) => [...prevData.slice(1), newCpuUsage]);
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;    
    setLabels((prevLabels) => {
      return [
        ...prevLabels.slice(1),
        formattedTime
      ];
    });
    // memory updates
    const newMemoryUsage = dynamicServerDetails.current.usedMemory; // Mock Memory usage value in MB
      setMemoryData((prevData) => [...prevData.slice(1), newMemoryUsage]);
      setMemLabels((prevLabels) => {
        return [
          ...prevLabels.slice(1),  // Remove the first label
          formattedTime            // Add the current time as the new label
        ];
      });
  }, [data])
  return (
    <div className={`absolute z-20 top-0 flex flex-col gap-2 overflow-auto lg:overflow-visible left-0 right-0 bottom-0 self-center mx-auto w-full h-full lg:h-[720px] bg-white border-[1px] border-[#CCCCCC] rounded-[10px] py-6 shadow-lg px-6`}>
      <div className='flex lg:flex-row flex-col justify-between lg:h-[50%] w-full'>
        <div className='w-full lg:w-[50%] h-[325px]'>
          <CpuUsageChart cpuData={cpuData} labels={labels}/>
        </div>
        <div className='w-full lg:w-[50%] h-[325px]'>
          <MemoryUsageChart memoryData={memoryData} labels={memLabels} maxValue={dynamicServerDetails.current.totalMemory}/>
        </div>
      </div>
      <div className='flex gap-2 lg:gap-0 lg:flex-row flex-col h-[50%] w-full justify-between'>
        <div className='flex flex-col gap-2 w-full lg:w-[40%] justify-between'>
          <div className='py-2 lg:py-0 lg:h-[48%] w-full rounded-[10px] px-4 justify-evenly flex flex-col border-[1px] border-black'>
            <p className='text-sm font-medium'>Processor - {serverDetails.cpu}</p>
            <p className='text-sm font-medium'>Architecture - {serverDetails.architecture}</p>
            <p className='text-sm font-medium'>CPU Cores - {serverDetails.cpuCore}</p>
            <p className='text-sm font-medium'>Machine - {serverDetails.machine}</p>
            <p className='text-sm font-medium'>Uptime - {dynamicServerDetails.current.uptime}</p>
          </div>
          <div className='py-2 lg:py-0 lg:h-[48%] w-full rounded-[10px] border-[1px] px-4 border-black flex justify-between'>
            <div className='flex flex-col justify-evenly'>
              <p className='text-sm font-medium'>Environment - {serverDetails.environment}</p>
              <p className='text-sm font-medium'>Hostname - {serverDetails.hostname}</p>
              <p className='text-sm font-medium'>Release - {serverDetails.release}</p>
              <p className='text-sm font-medium'>Platform Type - {serverDetails.serverPlatform}</p>
            </div>
            <div className='flex flex-col justify-evenly'>
              <p className='text-sm font-medium'>Free Memory - {dynamicServerDetails.current.freeMemory} MB</p>
              <p className='text-sm font-medium'>Used Memory - {dynamicServerDetails.current.usedMemory} MB</p>
              <p className='text-sm font-medium'>Total Memory - {dynamicServerDetails.current.totalMemory} MB</p>
              <p className='text-sm font-medium'>Platform - {serverDetails.platform}</p>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-[25%]'>
          <div className='h-full w-full bg-white border-[1px] border-black rounded-[10px] px-4 py-2'>
            <div className='flex flex-col justify-evenly h-full'>
              <p className='text-sm font-medium'>Name - {serverDetails.name}</p>
              <p className='text-sm font-medium'>IP - {serverDetails.ip}</p>
              <p className='text-sm font-medium'>Domain - {serverDetails.domain}</p>
              <p className='text-sm font-medium'>Connectivity Medium - {serverDetails.connectivityMedium}</p>
              <p className='text-sm font-medium'>Connection Type - {serverDetails.connectionType}</p>
              <p className='text-sm font-medium'>Type - {serverDetails.type}</p>
              <p className='text-sm font-medium'>Group - {serverDetails.groupName}</p>
              <p className='text-sm font-medium'>URL Path - {serverDetails.checked && '/'}{serverDetails.path}</p>
              
            </div>
          </div>
        </div>
        <div className='w-full lg:w-[32%] pb-2 lg:pb-0'>
          <div className='h-full w-full bg-black rounded-[10px] px-4 py-2'>
            <h1 className='text-end text-white text-sm font-medium'>Error Logs</h1>
            <div className='h-[200px] lg:h-[90%] w-full flex items-end overflow-auto flex-col'>
              {errorsList.current.map((each:Errors,index:number)=>
               <div key={index} className='w-full'><p className='text-white text-sm font-medium'>{each.time}</p>
               <p className='text-white text-sm font-medium'>-{serverDetails.connectivityMedium}: {each.error}</p>
               </div>)}
            </div>
          </div>
        </div>
        <button onClick={()=>setPopup('close')} className='bg-black w-[100px] h-[35px] lg:hidden text-white rounded-[10px] self-center text-sm font-medium hover:bg-white hover:text-black hover:border-[1px] hover:border-black py-2'>Close</button>
      </div>
      <button onClick={()=>setPopup('close')} className='bg-black lg:block hidden w-[100px] h-[35px] text-white rounded-[10px] self-center text-sm font-medium hover:bg-white hover:text-black hover:border-[1px] hover:border-black py-2'>Close</button>
    </div>
  )
}

export default Details