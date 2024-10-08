'use client'
import React, {  useRef, useState } from 'react'
import Navbar from './Home/Navbar'
import Groups from './Home/Groups'
import BottomBtns from './Home/BottomBtns'
import Server from './Home/Server'
import { useData } from '@/helpers/Data'
import CreatePopup, { Alerts, Error, ModifyPopup, Settings, ThresholdError } from './Home/Popup'
import APIUpdate from './Home/APIUpdate'
import WebSocketAPIUpdate from './Home/WebSocketAPIUpdate'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InitData from './Home/InitData'
import Details from './Home/Details'
const Home = () => {
  const {data,selectedGroupID} = useData();
  const [closedError, setClosedError] = useState(false);
  const values = useRef({connectivityType:'',connectivityMedium:'',type:''});
  const [popup, setPopup] = useState({modify:false,create:false,settings:false,details:false,alerts:false,error:false,thresholdError:false});
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  
  const setPopupType = (type: string) => {
    // Define the base state with all popups set to false

    const basePopupState = {
      modify: false,
      create: false,
      settings: false,
      details: false,
      alerts: false,
      error: false,
      thresholdError:false
    };
  
    // If the type is not 'close', set the corresponding popup to true
    const newPopupState =
      type !== 'close' ? { ...basePopupState, [type]: true } : basePopupState;
  
    // Update the popup state
    setPopup(newPopupState);
  };
  const setParams = (id:number)=>{
    data.map((each)=>{if(each.id===id){values.current={connectivityType:each.connectionType,connectivityMedium:each.connectivityMedium,type:each.type}}});
  }
  return (
    <div className='flex justify-center h-screen w-full'>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <APIUpdate setPopup={setPopupType}/>
      <WebSocketAPIUpdate setPopup={setPopupType}/>
      <InitData/>
      <div className='w-[95%] 2xl:w-[70%] h-full relative'>
        <Navbar/>
        {/* <Details/> */}
        {popup.create && <CreatePopup setPopup={setPopupType}/>}
        {popup.modify && <ModifyPopup setPopup={setPopupType} options={values.current}/>}
        {popup.settings && <Settings setPopup={setPopupType}/>}
        {popup.alerts && <Alerts setPopup={setPopupType}/>}
        {(popup.error && !closedError) && <Error setPopup={setPopupType} setClosedError={setClosedError}/>}
        {popup.thresholdError && <ThresholdError setPopup={setPopupType} setClosedError={setClosedError}/>}
        <Details setPopup={setPopupType} isOpen={popup.details}/>
        <div className='flex justify-center xl:justify-between h-[85%]'>
          <div className='hidden xl:flex xl:flex-col xl:justify-between'>
            <Groups/>
            <BottomBtns setPopup={setPopupType}/>
          </div>
          <div className='w-[955px] overflow-auto max-h-full min-h-[40%] flex flex-col gap-5'>
            {data.map((each)=> (each.groupID===selectedGroupID || selectedGroupID===0) &&
              <Server setParams={setParams} key={each.id} id={each.id} name={each.name} ip={each.ip} domain={each.domain} isRunning={each.isRunning} uptime={each.uptime} type={each.type} cpuUsage={each.cpuUsage} availMemory={each.availMemory} usedMemory={each.usedMemory} totalMemory={each.totalMemory} platform={each.platform} environment={each.environment} setPopup={setPopupType}/>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home