'use client'
import React, { useEffect, useState } from 'react'
import Navbar from './Home/Navbar'
import Groups from './Home/Groups'
import BottomBtns from './Home/BottomBtns'
import Server from './Home/Server'
import localStoragedb from 'localStorageDB';
import { useData } from '@/helpers/Data'
import CreatePopup, { Alerts, ModifyPopup, Settings } from './Home/Popup'
const Home = () => {
  const {setLibrary,setupData,setupGroup,data,selectedGroupID} = useData();
  const [popup, setPopup] = useState({modify:false,create:false,settings:false,details:false,alerts:false});
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const localDB = new localStoragedb('library');
        setLibrary(localDB);

        // Check the database
        checkDB(localDB);
    }
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
  };
  const setPopupType=(type:string)=>{
    switch (type) {
      case 'create':
        setPopup({modify:false,create:true,settings:false,details:false,alerts:false});
        break;
      case 'modify':
        setPopup({modify:true,create:false,settings:false,details:false,alerts:false});
        break;
      case 'close':
        setPopup({modify:false,create:false,settings:false,details:false,alerts:false});
        break;
      case 'settings':
        setPopup({modify:false,create:false,settings:true,details:false,alerts:false});
        break;
      case 'details':
        setPopup({modify:false,create:false,settings:false,details:true,alerts:false});
        break;
      case 'alerts':
        setPopup({modify:false,create:false,settings:false,details:false,alerts:true});
        break;
    }
  }
  return (
    <div className='flex justify-center h-screen w-full'>
      <div className='w-[95%] 2xl:w-[70%] h-full relative'>
        <Navbar/>
        {popup.create && <CreatePopup setPopup={setPopupType}/>}
        {popup.modify && <ModifyPopup setPopup={setPopupType}/>}
        {popup.settings && <Settings setPopup={setPopupType}/>}
        {popup.alerts && <Alerts setPopup={setPopupType}/>}
        <div className='flex justify-center xl:justify-between h-[88%]'>
          <div className='hidden xl:flex flex-col xl:justify-between'>
            <Groups/>
            <BottomBtns setPopup={setPopupType}/>
          </div>
          <div className='w-[955px] overflow-auto h-full flex flex-col gap-5'>
            {data.map((each)=> (each.groupID===selectedGroupID || selectedGroupID===0) &&
              <Server key={each.id} id={each.id} name={each.name} ip={each.ip} domain={each.domain} isRunning={each.isRunning} uptime={each.uptime} type={each.type} cpuUsage={each.cpuUsage} availMemory={each.availMemory} usedMemory={each.usedMemory} totalMemory={each.totalMemory} platform={each.platform} environment={each.environment} setPopup={setPopupType}/>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home