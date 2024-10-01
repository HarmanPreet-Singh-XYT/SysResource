'use client'
import fetchSystemInfo from '@/app/api/APIData';
import { useThreshold } from '@/helpers/Alerts';
import { useData } from '@/helpers/Data'
import { useSettings } from '@/helpers/Settings';
import React, { useEffect, useRef } from 'react'
const APIUpdate = ({setPopup}:{setPopup:(text:string)=>void}) => {
    const {dataLoaded, data, updateData} = useData();
    const APITries = useRef(0);
    const {cpuThreshold,memoryThreshold,customAlert,alertsEnabled} = useThreshold();
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
                    if(APIRes.status && APIRes.data != undefined){
                        APITries.current = 0;
                        updateData(each.id, {
                            id: dataRef.current[index].id,
                            name: dataRef.current[index].name,
                            ip: dataRef.current[index].ip,
                            domain: dataRef.current[index].domain,
                            isRunning: true, // Update based on the API response
                            uptime: APIRes.data.uptime > 60 
                                ? `${(APIRes.data.uptime / 60).toFixed(2)} Hours` 
                                : `${APIRes.data.uptime.toFixed(0)} Minutes`,
                            type: dataRef.current[index].type,
                            cpuUsage: APIRes.data.cpuUsage,
                            availMemory: APIRes.data.freeMemory,
                            totalMemory: APIRes.data.totalMemory,
                            usedMemory: APIRes.data.totalMemory - APIRes.data.freeMemory,
                            platform: APIRes.data?.type,
                            environment: APIRes.data.environment,
                            connectivityMedium: dataRef.current[index].connectivityMedium,
                            ipDomain: dataRef.current[index].ipDomain,
                            groupID: dataRef.current[index].groupID,
                            APIKey: dataRef.current[index].APIKey,
                            urlPath: dataRef.current[index].urlPath,
                            connectionType: dataRef.current[index].connectionType,
                            creationTime: dataRef.current[index].creationTime
                        });
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
                                id: dataRef.current[index].id,
                                name: dataRef.current[index].name,
                                ip: dataRef.current[index].ip,
                                domain: dataRef.current[index].domain,
                                isRunning: false,  // Set to false since the system is down
                                uptime: dataRef.current[index].uptime,
                                type: dataRef.current[index].type,
                                cpuUsage: 0,  // Resetting CPU usage to zero
                                availMemory: 0,  // Resetting available memory to zero
                                totalMemory: 0,  // Resetting total memory to zero
                                usedMemory: 0,  // Resetting used memory to zero
                                platform: dataRef.current[index].platform,
                                environment: dataRef.current[index].environment,
                                connectivityMedium: dataRef.current[index].connectivityMedium,
                                ipDomain: dataRef.current[index].ipDomain,
                                groupID: dataRef.current[index].groupID,
                                APIKey: dataRef.current[index].APIKey,
                                urlPath: dataRef.current[index].urlPath,
                                connectionType: dataRef.current[index].connectionType,
                                creationTime: dataRef.current[index].creationTime
                            });
                            if(firstTime.current === false && alertsEnabled) setPopup('error');
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