'use client'
import fetchSystemInfo from '@/app/api/APIData';
import { useData } from '@/helpers/Data'
import { useSettings } from '@/helpers/Settings';
import React, { useEffect, useRef } from 'react'
const APIUpdate = ({setPopup}:{setPopup:(text:string)=>void}) => {
    const {dataLoaded, data, updateData} = useData();
    const APITries = useRef(0);
    const {apiInterval, maxAPIFailure} = useSettings();
    const firstTime = useRef(true);
    async function APIRequests (){
        if(dataLoaded){
            data.map(async (each)=>{
                if(each.connectionType==='API'){
                    const APIRes = await fetchSystemInfo(each.ipDomain,each.urlPath,each.APIKey);
                    if(APIRes.status && APIRes.data != undefined){
                        APITries.current = 0;
                        updateData(each.id,{...each, platform:APIRes.data?.type,cpuUsage:APIRes.data.cpuUsage,availMemory:APIRes.data.freeMemory,
                            totalMemory:APIRes.data.totalMemory,usedMemory:APIRes.data.totalMemory-APIRes.data.freeMemory,
                            uptime:`${APIRes.data.uptime>60 ? `${(APIRes.data.uptime/60).toFixed(2)} Hours` : `${(APIRes.data.uptime).toFixed(0)} Minutes`}`,
                            isRunning:true,environment:APIRes.data.environment});
                        firstTime.current = false;
                    }else{
                        if(APITries.current<maxAPIFailure){
                            APITries.current++;
                        }else{
                            updateData(each.id,{...each,isRunning:false,totalMemory:0,availMemory:0,usedMemory:0,cpuUsage:0});
                            if(firstTime.current === false) setPopup('error');
                        }
                    }
                }
            })
        }
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            APIRequests();
        },
        apiInterval)
    
      return () => {
        clearInterval(intervalId);
      }
    }, [dataLoaded]);
    
  return (
    <></>
  )
}

export default APIUpdate