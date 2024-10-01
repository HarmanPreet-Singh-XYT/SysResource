'use client'
import React, { useEffect } from 'react'
import localStorageDB from 'localStorageDB';
import { useData } from '@/helpers/Data';
import setApiConfigCookies from '@/app/api/CookieData';
import { useThreshold } from '@/helpers/Alerts';
import { useSettings } from '@/helpers/Settings';
const InitData = () => {
    const {setLibrary,setupData,setupGroup,setDataLoaded} = useData();
    const { setAlertsEnabled, setCustomAlert, setCpuThreshold, setMemoryThreshold, setServerDown} = useThreshold();
    const { setApiInterval, setApiHistoryLimit, setmaxAPIFailure} = useSettings();
    const initiateData = async ()=>{
        if (typeof window !== 'undefined') {
            const localDB = new localStorageDB('library');
            setLibrary(localDB);
    
            // Check the database
            checkDB(localDB);
            const initializeData =await setApiConfigCookies({});
            if(!initializeData.isCreated && initializeData.retrievedData!==null){
                setApiInterval(initializeData.retrievedData.apiInterval);
                setApiHistoryLimit(initializeData.retrievedData.apiHistoryLimit);
                setmaxAPIFailure(initializeData.retrievedData.maxAPIFailure);
                setAlertsEnabled(initializeData.retrievedData.alertsEnabled);
                setCustomAlert(initializeData.retrievedData.customAlert);
                setCpuThreshold(initializeData.retrievedData.cpuThreshold);
                setMemoryThreshold(initializeData.retrievedData.memoryThreshold);
                setServerDown(initializeData.retrievedData.serverDown);
            }
        }
    }
    useEffect(() => {
        initiateData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkDB = (db: any) => {
        if (db.isNew()) {
            // Create tables if the database is new
            db.createTable('groupData', ['id', 'name','creationTime']);
            db.createTable('serverData', [
                'id', 'name', 'ip', 'domain', 'isRunning', 'uptime', 'type',
                'cpuUsage', 'availMemory', 'totalMemory', 'usedMemory', 'platform',
                'environment', 'connectivityMedium', 'ipDomain', 'groupID', 'APIKey','connectionType','urlPath', 'creationTime'
            ]);
    
            // Commit changes
            db.commit();
        }else{
          const serverData = db.queryAll("serverData", { sort: [["creationTime", "ASC"]] });
          const groupData = db.queryAll("groupData", { sort: [["creationTime", "ASC"]] });
          setupData(serverData);
          setupGroup(groupData);
        }
        setDataLoaded(true);
      };
  return (
    <></>
  )
}

export default InitData