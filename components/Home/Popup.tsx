'use client'
import { updateApiConfigCookie } from '@/app/api/CookieData';
import useDB from '@/controller/LocalDatabase';
import { useThreshold } from '@/helpers/Alerts';
import { useData } from '@/helpers/Data';
import { useSettings } from '@/helpers/Settings';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const CreatePopup = ({setPopup}:{setPopup:(type:string)=>void}) => {
    const {groups,addData} = useData();
    const {addServerDB} = useDB();
    const [dropdown, setdropdown] = useState(false);
    const [selectedGroup, setselectedGroup] = useState({id:0,name:'All'});
    const [connectivityMedium, setconnectivityMedium] = useState<'Domain'|'IP'>('Domain');
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
            type:e.target.type.value,
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
            urlPath:e.target.path.value,
            connectionType:e.target.connectionType.value,
            creationTime:new Date().toISOString()
        }
        addData(data);
        addServerDB(data);
        setPopup('close');
    }
  return (
    <form onSubmit={addServer} className='absolute z-20 top-0 left-0 right-0 bottom-0 self-center mx-auto w-[650px] h-[500px] bg-white border-[1px] border-[#CCCCCC] rounded-[10px] py-8 shadow-lg px-10'>
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
              <div className='flex flex-col'>
                <label className='font-bold'>Connection Type</label>
                <div className='flex justify-between mt-2'>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='API' className='font-semibold'>API</label>
                    <input defaultChecked type='radio' name='connectionType' id='API' value={'API'} className='w-[20px] h-[20px] accent-black'/>
                  </div>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='API' className='font-semibold'>WebSocket</label>
                    <input type='radio' name='connectionType' id='WebSocket' value={'WebSocket'} className='w-[20px] h-[20px] accent-black'/>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-evenly h-full w-[45%]'>
              <div className='flex flex-col'>
                <label className='font-bold'>Connectivity Medium</label>
                <div className='flex justify-between mt-2'>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='ip' className='font-semibold'>IP</label>
                    <input onClick={()=>setconnectivityMedium('IP')} type='radio' name='mediumType' id='ip' value={'IP'} className='w-[20px] h-[20px] accent-black'/>
                  </div>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='domain' className='font-semibold'>Domain</label>
                    <input onClick={()=>setconnectivityMedium('Domain')} type='radio' name='mediumType' id='domain' value={'Domain'} defaultChecked className='w-[20px] h-[20px] accent-black'/>
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
                    <input type='radio' name='type' value={'Production'} defaultChecked className='w-[20px] h-[20px] accent-black'/>
                  </div>
                  <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Development</label>
                    <input type='radio' name='type' value={'Development'} className='w-[20px] h-[20px] accent-black'/>
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
              <div className='flex flex-col'>
                <label className='font-bold'>URL Path</label>
                <div className='flex'>
                  <div className='rounded-l-[10px] w-[40px] h-[40px] border-[1px] border-[#CCCCCC] flex items-center justify-center'><label className='font-bold text-xl'>/</label></div>
                  <input required defaultValue={'sysresource'} type='text' name='path' placeholder='Enter URL Path' className='border-[1px] border-[#CCCCCC] rounded-r-[10px] w-[250px] h-[40px] px-2'/>
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
const defaultData = {
  id:0,
  name:'',
  ip:'',
  domain:'',
  isRunning:false,
  uptime:'',
  type:"Development",
  cpuUsage:0,
  availMemory:0,
  totalMemory:0,
  usedMemory:0,
  platform:'',
  environment:'',
  connectivityMedium:'IP',
  ipDomain:'',
  groupID:0,
  APIKey:'',
  urlPath:'sysresource',
  connectionType:'API',
  creationTime:''
}
interface Data {
  id: number;
  name: string;
  ip?: string;
  domain?: string;
  isRunning: boolean;
  uptime: string;
  type: string;
  cpuUsage: number;
  availMemory: number;
  totalMemory: number;
  usedMemory: number;
  platform: string;
  environment: string;
  connectivityMedium: string;
  ipDomain: string;
  groupID: number;
  APIKey: string;
  urlPath:string;
  connectionType:string;
  creationTime: string;
}
export const ModifyPopup = ({setPopup}:{setPopup:(type:string)=>void}) => {
    const {groups,selectedServerID,data,updateData} = useData();
    const [Data, setData] = useState<Data>(defaultData);
    const [ConnectionType, setConnectionType] = useState<string>('API');
    useEffect(() => {
      data.map((each)=>{if(each.id===selectedServerID)setData(each)});
      const groupSetup = groups.find((each) => each.id === Data.groupID);
      if (groupSetup !== undefined) {
        setselectedGroup({ id: groupSetup.id, name: groupSetup.name });
      }
      setConnectionType(Data.connectionType);
      setType(Data.type);
      setconnectivityMedium(Data.connectivityMedium);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const {updateServerDB} = useDB();
    const [dropdown, setdropdown] = useState(false);
    const [selectedGroup, setselectedGroup] = useState({id:0,name:'All'});
    const [connectivityMedium, setconnectivityMedium] = useState<string>('Domain');
    const [type, setType] = useState<string>('Production');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addServer = (e:any)=>{
        e.preventDefault();
        const data = {
            id:selectedServerID,
            name:e.target.name.value,
            ip:e.target.optIP.value,
            domain:e.target.optDomain.value,
            isRunning:Data.isRunning,
            uptime:Data.uptime,
            type:e.target.type.value,
            cpuUsage:Data.cpuUsage,
            availMemory:Data.availMemory,
            totalMemory:Data.totalMemory,
            usedMemory:Data.usedMemory,
            platform:Data.platform,
            environment:Data.environment,
            connectivityMedium:e.target.mediumType.value,
            ipDomain:e.target.ipDomain.value,
            groupID:selectedGroup.id,
            APIKey:e.target.APIKey.value,
            urlPath:e.target.path.value,
            connectionType:e.target.connectionType.value,
            creationTime:Data.creationTime
        }
        updateData(data.id,data);
        updateServerDB(data.id,data);
        setPopup('close');
    }
  return (
    <form onSubmit={addServer} className='absolute z-20 top-0 left-0 right-0 bottom-0 self-center mx-auto w-[650px] h-[450px] bg-white border-[1px] border-[#CCCCCC] rounded-[10px] py-8 shadow-lg px-10'>
          <div className='flex h-[85%] justify-between'>
            <div className='flex flex-col justify-evenly h-full'>
              <div className='flex flex-col'>
                <label className='font-bold'>Name*</label>
                <input type='text' name='name' defaultValue={Data.name} required placeholder='Enter Name' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold'>IP <span className='font-normal text-[#CCCCCC] text-sm'>(Optional)</span></label>
                <input type='text' name='optIP' defaultValue={Data.ip} placeholder='Enter IP' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold'>Domain <span className='font-normal text-[#CCCCCC] text-sm'>(Optional)</span></label>
                <input type='text' name='optDomain' defaultValue={Data.domain} placeholder='Enter Domain' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold'>API Access Key*</label>
                <input type='text' name='APIKey' defaultValue={Data.APIKey} required placeholder='Enter API Access Key' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold'>Connection Type</label>
                <div className='flex justify-between mt-2'>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='ip' className='font-semibold'>API</label>
                    <input defaultChecked={ConnectionType==='API'} type='radio' name='connectionType' id='API' value={'API'} className='w-[20px] h-[20px] accent-black'/>
                  </div>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='domain' className='font-semibold'>WebSocket</label>
                    <input defaultChecked={ConnectionType==='WebSocket'} type='radio' name='connectionType' id='WebSocket' value={'WebSocket'} className='w-[20px] h-[20px] accent-black'/>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-evenly h-full w-[45%]'>
              <div className='flex flex-col'>
                <label className='font-bold'>Connectivity Medium</label>
                <div className='flex justify-between mt-2'>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='ip' className='font-semibold'>IP</label>
                    <input defaultChecked={connectivityMedium==='IP'} onClick={()=>setconnectivityMedium('IP')} type='radio' name='mediumType' id='ip' value={'IP'} className='w-[20px] h-[20px] accent-black'/>
                  </div>
                  <div className='flex items-center gap-2'>
                    <label htmlFor='domain' className='font-semibold'>Domain</label>
                    <input defaultChecked={connectivityMedium==='Domain'} onClick={()=>setconnectivityMedium('Domain')} type='radio' name='mediumType' id='domain' value={'Domain'} className='w-[20px] h-[20px] accent-black'/>
                  </div>
                </div>
              </div>
              <div className='flex flex-col mt-1'>
                <label className='font-bold'>Connection {connectivityMedium} with Port</label>
                <input type='text' defaultValue={Data.ipDomain} required placeholder={`${connectivityMedium==='Domain' ? 'https://www.google.com:3000' : '127.0.0.1:3000'}`} name='ipDomain' className='border-[1px] border-[#CCCCCC] rounded-[10px] w-[250px] h-[40px] px-4'/>
              </div>
              <div className='flex flex-col mt-1'>
                <label className='font-bold'>Type</label>
                <div className='flex justify-between mt-2'>
                  <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Production</label>
                    <input defaultChecked={type==='Production'} type='radio' name='type' value={'Production'} className='w-[20px] h-[20px] accent-black'/>
                  </div>
                  <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Development</label>
                    <input defaultChecked={type==='Development'} type='radio' name='type' value={'Development'} className='w-[20px] h-[20px] accent-black'/>
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
              <div className='flex flex-col'>
                <label className='font-bold'>URL Path</label>
                <div className='flex'>
                  <div className='rounded-l-[10px] w-[40px] h-[40px] border-[1px] border-[#CCCCCC] flex items-center justify-center'><label className='font-bold text-xl'>/</label></div>
                  <input required defaultValue={Data.urlPath} type='text' name='path' placeholder='Enter URL Path' className='border-[1px] border-[#CCCCCC] rounded-r-[10px] w-[250px] h-[40px] px-2'/>
                </div>
              </div>
            </div>
          </div>
            <div className='flex justify-evenly mt-2'>
              <button type='button' onClick={()=>setPopup('close')} className='w-[100px] h-[40px] font-bold text-black text-[16px] hover:bg-black hover:text-white border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Cancel</button>
              <button type='submit' className='w-[120px] h-[40px] font-bold text-white bg-black text-[16px] hover:bg-white hover:text-black border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Modify</button>
            </div>
        </form>
  )
}

const Clipboard = ()=>{
  return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
  )
}

function generateRandomKey(length:number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomKey = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomKey += characters[randomIndex];
  }
  
  return randomKey;
}
export const Settings = ({setPopup}:{setPopup:(type:string)=>void}) => {
  const [generatedKey, setgeneratedKey] = useState('Generate key');
  const {apiHistoryLimit,apiInterval,setApiHistoryLimit,setApiInterval,maxAPIFailure,setmaxAPIFailure} = useSettings();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setParameters = (e:any)=>{
    e.preventDefault();
    setApiHistoryLimit(parseInt(e.target.limit.value));
    setApiInterval(parseInt(e.target.interval.value));
    setmaxAPIFailure(parseInt(e.target.maxretries.value));
    updateApiConfigCookie('apiHistoryLimit', parseInt(e.target.limit.value));
    updateApiConfigCookie('apiInterval', parseInt(e.target.interval.value));
    updateApiConfigCookie('maxAPIFailure', parseInt(e.target.maxretries.value));
    setPopup('close');
  }
  const copyToClipboard = (text:string)=>{
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  return (
    <form onSubmit={setParameters} className='absolute z-20 top-0 left-0 right-0 bottom-0 self-center mx-auto w-full sm:w-[400px] h-[300px] bg-white border-[1px] border-[#CCCCCC] rounded-[10px] py-6 shadow-lg px-6'>
      <label className='font-bold text-sm'>Use this key for API Access Key</label>
      <div className='w-full mt-2 items-center h-[40px] px-2 rounded-[10px] border-[1px] flex justify-between border-[#CCCCCC]'>
        <p className='font-medium text-sm'>{generatedKey}</p>
        <button type='button' onClick={()=>copyToClipboard(generatedKey)} className='w-[30px] h-[40px]'><Clipboard/></button>
      </div>
      <button type='button' onClick={()=>setgeneratedKey(generateRandomKey(30))} className='w-[100px] mt-2 self-center h-[40px] font-bold text-white bg-black text-[16px] hover:bg-white hover:text-black border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Generate</button>
      {/* <h3 className='font-bold mt-4 text-sm'>Import data</h3>
      <div className='w-[60%] h-[100px] mt-2 mx-auto flex flex-col justify-evenly border-[1px] border-[#CCCCCC] rounded-[10px]'>
        <button className='w-[80%] h-[30px] font-medium text-sm rounded-[10px] flex items-center justify-center border-[1px] mx-auto border-[#CCCCCC]'>
          Choose File
        </button>
        <button className='w-[100px] text-sm mt-2 self-center h-[35px] font-bold text-white bg-black text-[16px] hover:bg-white hover:text-black border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Import</button>
      </div>
      <h3 className='font-bold mt-4 text-sm'>Export data</h3>
      <div className='w-[75%] px-4 h-[120px] mt-2 mx-auto flex flex-col justify-evenly border-[1px] border-[#CCCCCC] rounded-[10px]'>
        <label className='text-sm font-medium'>File Name</label>
        <input placeholder='backup' className='w-full h-[40px] px-2 text-sm rounded-[10px] flex items-center justify-center border-[1px] mx-auto border-[#CCCCCC]'/>
        <button className='w-[100px] mt-2 self-center text-sm h-[35px] font-bold text-white bg-black text-[16px] hover:bg-white hover:text-black border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Export</button>
      </div> */}
      <div className='flex justify-between mt-2'>
        <div>
          <label className='text-sm font-bold'>API Interval</label>
          <input defaultValue={apiInterval} type='number' placeholder='ms' name='interval' className='w-[100px] h-[40px] px-2 text-sm rounded-[10px] flex items-center justify-center border-[1px] border-[#CCCCCC]'/>
        </div>
        <div>
          <label className='text-sm font-bold'>Max Retries</label>
          <input defaultValue={maxAPIFailure} type='number' placeholder='5' name='maxretries' className='w-[50px] h-[40px] px-2 text-sm rounded-[10px] flex items-center justify-center border-[1px] border-[#CCCCCC]'/>
        </div>
        <div>
          <label className='text-sm font-bold'>API History Limit</label>
          <input defaultValue={apiHistoryLimit} type='number' placeholder='100' name='limit' className='w-[100px] h-[40px] px-2 text-sm rounded-[10px] flex items-center justify-center border-[1px] border-[#CCCCCC]'/>
        </div>
      </div>
      <div className='w-full justify-evenly flex mt-4'>
        <button type='button' onClick={()=>setPopup('close')} className='w-[100px] text-sm h-[40px] font-bold text-black text-[16px] hover:bg-black hover:text-white border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Cancel</button>
        <button type='submit' className='w-[100px] text-sm h-[40px] font-bold text-white bg-black text-[16px] hover:bg-white hover:text-black border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Apply</button>
      </div>
    </form>
  )
}

export const Alerts = ({setPopup}:{setPopup:(type:string)=>void})=>{
  const {alertsEnabled, setAlertsEnabled, customAlert, setCustomAlert, cpuThreshold, setCpuThreshold, memoryThreshold, setMemoryThreshold, serverDown, setServerDown} = useThreshold();
  const setParams = (value:string,setting:string)=>{
    switch (setting) {
      case 'alerts':
        setAlertsEnabled(!alertsEnabled);
        updateApiConfigCookie('alertsEnabled', !alertsEnabled);
        break;
      case 'serverDown':
        setServerDown(!serverDown);
        updateApiConfigCookie('serverDown', !serverDown);
        break;
      case 'customAlert':
        setCustomAlert(!customAlert);
        updateApiConfigCookie('customAlert', !customAlert);
        break;
      case 'cpuThreshold':
        setCpuThreshold(parseInt(value));
        updateApiConfigCookie('cpuThreshold', parseInt(value));
        break;
      case 'memoryThreshold':
        setMemoryThreshold(parseInt(value));
        updateApiConfigCookie('memoryThreshold', parseInt(value));
        break;
    }
  }
  return (
    <div className='absolute z-20 top-0 flex flex-col gap-2 left-0 right-0 bottom-0 self-center mx-auto w-full sm:w-[400px] h-[250px] bg-white border-[1px] border-[#CCCCCC] rounded-[10px] py-6 shadow-lg px-6'>
      <div className='flex justify-between items-center'>
        <h3 className='font-bold'>Alerts</h3>
        <label className="switch">
          <input defaultChecked={alertsEnabled} onClick={()=>setParams('','alerts')} type="checkbox"/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className='flex justify-between items-center'>
        <h3 className='font-medium text-sm'>Server Down</h3>
        <label className="switch">
          <input defaultChecked={serverDown} onClick={()=>setParams('','serverDown')} type="checkbox"/>
          <span className="slider round"></span>
        </label>
      </div>
      <div className='flex justify-between items-center'>
        <h3 className='font-medium text-sm'>Threshold Alert</h3>
        <label className="switch">
          <input defaultChecked={customAlert} onClick={()=>setParams('','customAlert')} type="checkbox"/>
          <span className="slider round"></span>
        </label>
      </div>
      <ul className='flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
          <li className='list-item text-sm font-medium'>CPU Threshold</li>
          <div className='flex'>
            <input defaultValue={cpuThreshold} onChange={(e)=>setParams(e.target.value,'cpuThreshold')} type='number' max={100} min={5} maxLength={3} className='border-[1px] border-black text-center rounded-[100px] w-[60px]'/>
            <label className='ml-1 font-bold text-lg'>%</label>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <li className='list-item text-sm font-medium'>Memory Threshold</li>
          <div className='flex'>
            <input defaultValue={memoryThreshold} onChange={(e)=>setParams(e.target.value,'memoryThreshold')} type='number' max={100} min={5} maxLength={3} className='border-[1px] border-black text-center rounded-[100px] w-[60px]'/>
            <label className='ml-1 font-bold text-lg'>%</label>
          </div>
        </div>
      </ul>
      <button onClick={()=>setPopup('close')} className='w-[100px] text-sm mt-2 self-center py-1 font-bold text-white bg-black text-[16px] hover:bg-white hover:text-black border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Close</button>
    </div>
  );
}
export const Error = ({setPopup,setClosedError}:{setPopup:(type:string)=>void,setClosedError:(value:boolean)=>void})=>{
  const {data} = useData();
  const [Mute, setMute] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [audio, setAudio] = useState<any>(null);
  useEffect(() => {
    const audioElement = new Audio('https://assets.mixkit.co/active_storage/sfx/2964/2964-preview.mp3');
    setAudio(audioElement);
    const interVal = setInterval(() => {
      if(Mute===false && audio !== null) audio.play();
    },1000)
  
    return () => {
      clearInterval(interVal);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data,Mute])
  
  return (
    <div className='absolute z-20 top-0 flex flex-col gap-2 left-0 right-0 bottom-0 self-center mx-auto w-full sm:w-[400px] h-auto bg-white border-[1px] border-[#CCCCCC] rounded-[10px] py-6 shadow-lg px-6'>
      <h3 className='font-bold'>Error</h3>
      <p className='font-medium text-sm'>The following servers went down:</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div className='overflow-auto max-h-[600px]'>
        <ul className='flex flex-col gap-2'>
          {data.map((each)=>each.isRunning === false ? <li key={each.id} className='list-item text-sm font-medium'>{each.name}</li> : null)}
        </ul>
      </div>
      
      <div className='flex justify-evenly'>
        <button onClick={()=>{setClosedError(true);setPopup('close')}} className='w-[100px] text-sm mt-2 self-center py-1 font-bold text-white bg-black text-[16px] hover:bg-white hover:text-black border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Close</button>
        <button onClick={()=>setMute(!Mute)} className='w-[100px] text-sm mt-2 self-center py-1 font-bold text-white bg-black text-[16px] hover:bg-white hover:text-black border-[1px] border-[#000000] rounded-[10px] items-center px-4'>Mute</button>
      </div>
      
    </div>
  );
}

export default CreatePopup