'use client'
import useDB from '@/Controller/LocalDatabase';
import { useData } from '@/Helpers/Data';
import React, { useState } from 'react'

const CreatePopup = ({setPopup}:{setPopup:(type:string)=>void}) => {
    const {groups,addData} = useData();
    const {addServerDB} = useDB();
    const [dropdown, setdropdown] = useState(false);
    const [selectedGroup, setselectedGroup] = useState({id:0,name:'All'});
    const [connectivityMedium, setconnectivityMedium] = useState<'Domain'|'IP'>('Domain');
    const [type, setType] = useState<'Production'|'Development'>('Production');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addServer = (e:any)=>{
        e.preventDefault();
        const data = {
            id:Math.floor(Math.random()*10000),
            name:e.target.name.value,
            ip:e.target.optIP.value,
            domain:e.target.optDomain.value,
            isRunning:false,
            uptime:'Checking...',
            type,
            cpuUsage:0,
            availMemory:0,
            totalMemory:0,
            usedMemory:0,
            platform:'Checking...',
            environment:'Checking...',
            connectivityMedium:connectivityMedium,
            ipDomain:e.target.ipDomain.value,
            groupID:selectedGroup.id,
            APIKey:e.target.APIKey.value,
            creationTime:new Date().toISOString()
        }
        console.log(data);
        addData(data);
        addServerDB(data);
        setPopup('close');
    }
  return (
    <form onSubmit={addServer} className='absolute z-20 top-0 left-0 right-0 bottom-0 self-center mx-auto w-[600px] h-[400px] bg-white border-[1px] border-[#CCCCCC] rounded-[10px] py-4 shadow-lg px-6'>
          <div className='flex h-[85%] justify-between'>
            <div className='flex flex-col justify-evenly h-full'>
              <div className='flex flex-col'>
                <label className='font-bold'>Name*</label>
                <input type='text' name='name' required placeholder='Enter Name' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold'>IP <span className='font-normal text-[#CCCCCC] text-sm'>(Optional)</span></label>
                <input type='text' name='optIP' placeholder='Enter IP' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold'>Domain <span className='font-normal text-[#CCCCCC] text-sm'>(Optional)</span></label>
                <input type='text' name='optDomain' placeholder='Enter Domain' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold'>API Access Key*</label>
                <input type='text' name='APIKey' required placeholder='Enter API Access Key' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/>
              </div>
            </div>
            <div className='flex flex-col justify-evenly h-full w-[45%]'>
              <div className='flex flex-col'>
                <label className='font-bold'>Connectivity Medium</label>
                <div className='flex justify-between mt-2'>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='ip' className='font-semibold'>IP</label>
                    <input onClick={()=>setconnectivityMedium('IP')} type='radio' name='mediumType' id='ip' value={'ip'} className='w-[20px] h-[20px] accent-black'/>
                  </div>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='domain' className='font-semibold'>Domain</label>
                    <input onClick={()=>setconnectivityMedium('Domain')} type='radio' name='mediumType' id='domain' value={'domain'} defaultChecked className='w-[20px] h-[20px] accent-black'/>
                  </div>
                </div>
              </div>
              <div className='flex flex-col mt-1'>
                <label className='font-bold'>Connection {connectivityMedium} with Port</label>
                <input type='text' required placeholder={`${connectivityMedium==='Domain' ? 'https://www.google.com:3000' : '127.0.0.1:3000'}`} name='ipDomain' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/>
              </div>
              <div className='flex flex-col mt-1'>
                <label className='font-bold'>Type</label>
                <div className='flex justify-between mt-2'>
                  <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Production</label>
                    <input onClick={()=>setType('Production')} type='radio' name='type' defaultChecked className='w-[20px] h-[20px] accent-black'/>
                  </div>
                  <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Development</label>
                    <input onClick={()=>setType('Development')} type='radio' name='type' className='w-[20px] h-[20px] accent-black'/>
                  </div>
                </div>
              </div>
              <div className='flex flex-col mt-1'>
                <label className='font-bold'>Group</label>
                {/* <input type='text' placeholder='Enter Group' name='medium' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/> */}
                <div className="relative inline-block text-left">
                    <div>
                        <button onClick={() => setdropdown(!dropdown)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        {selectedGroup.name}
                        <svg className={`-mr-1 h-5 w-5 transition-transform duration-200 text-gray-400 ${dropdown ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </div>
                    
                    {dropdown && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                        <div className="py-1" role="none">
                            <button onClick={()=>{setselectedGroup({id:0,name:'All'});setdropdown(false)}} className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 w-[95%] rounded-[5px] mx-auto text-start" role="menuitem" id="menu-item-0">All</button>
                            {groups.map((each)=>(
                                <button onClick={()=>{setselectedGroup({id:each.id,name:each.name});setdropdown(false)}} key={each.id} className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 w-[95%] rounded-[10px] mx-auto text-start" role="menuitem">{each.name}</button>
                            ))}
                        </div>
                    </div>}
                </div>
              </div>
            </div>
          </div>
            <div className='flex justify-evenly mt-2'>
              <button type='button' onClick={()=>setPopup('close')} className='w-[100px] h-[40px] font-bold text-black text-[16px] hover:bg-black hover:text-white border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Cancel</button>
              <button type='submit' className='w-[120px] h-[40px] font-bold text-white bg-black text-[16px] hover:bg-white hover:text-black border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Add Server</button>
            </div>
        </form>
  )
}

export default CreatePopup