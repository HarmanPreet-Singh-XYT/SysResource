'use client'
import fetchSystemInfo from '@/app/api/APIData';
import { useThreshold } from '@/helpers/Alerts';
import { useData } from '@/helpers/Data'
import { useSettings } from '@/helpers/Settings';
import React, { useEffect, useRef } from 'react'
const APIUpdate = ({setPopup}:{setPopup:(text:string)=>void}) => {
    const {dataLoaded, data, updateData,Requests} = useData();
    const APITries = useRef(0);
    const {cpuThreshold,memoryThreshold,customAlert,alertsEnabled,serverDown} = useThreshold();
    const {apiInterval, maxAPIFailure} = useSettings();
    const firstTime = useRef(true);
    const dataRef = useRef(data);

    useEffect(() => {
        dataRef.current = data;
    }, [data]); // Keep updating the ref when data changes
    async function APIRequests (){
        if(dataLoaded){
            data.map(async (each,index)=>{
                if(each.connectionType==='API'){
                    const APIRes = await fetchSystemInfo(each.ipDomain,each.urlPath,each.APIKey);
                    if(APIRes.status && APIRes.data != undefined && APIRes.data !== null){
                        APITries.current = 0;
                        updateData(each.id, {
                            ...dataRef.current[index],
                            id:each.id,
                            platform: APIRes.data.type,
                            cpuUsage: APIRes.data.cpuUsage,
                            availMemory: APIRes.data.freeMemory,
                            totalMemory: APIRes.data.totalMemory,
                            usedMemory: APIRes.data.totalMemory - APIRes.data.freeMemory,
                            uptime: APIRes.data.uptime > 60
                                ? `${(APIRes.data.uptime / 60).toFixed(2)} Hours`
                                : `${(APIRes.data.uptime).toFixed(0)} Minutes`,
                            isRunning: true,
                            environment: APIRes.data.environment,
                        });
                        // Requests.map((eacharr)=>each.id===eacharr.id && 
                        // eacharr.requests.push({status:true,hostname:APIRes.data.hostname,cpuUsage:APIRes.data.cpuUsage,cpu:APIRes.data.cpu,
                        //     cpuCore:APIRes.data.cpuCore,totalMemory:APIRes.data.totalMemory,
                        //     freeMemory:APIRes.data.freeMemory,uptime:APIRes.data.uptime,platform:APIRes.data.type,
                        //     environment:APIRes.data.environment,release:APIRes.data.release,machine:APIRes.data.machine,
                        //     architecture:APIRes.data.architecture,type:APIRes.data.type}));
                        firstTime.current = false;
                        if(customAlert && alertsEnabled){
                            if(APIRes.data.cpuUsage>cpuThreshold || APIRes.data.freeMemory<memoryThreshold){
                                setPopup('thresholdError');
                            }
                        }
                    }else{
                        if(APITries.current<maxAPIFailure){
                            APITries.current++;
                        }else{
                            updateData(each.id, {
                                ...dataRef.current[index],
                                id:each.id,
                                isRunning: false,
                                totalMemory: 0,
                                availMemory: 0,
                                usedMemory: 0,
                                cpuUsage: 0,
                            });
                            if(firstTime.current === false && alertsEnabled && serverDown) setPopup('error');
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
    }, [dataLoaded,apiInterval]);
    
  return (
    <></>
  )
}

export default APIUpdate