'use client'
import useDB from '@/Controller/LocalDatabase'
import { useData } from '@/Helpers/Data'
import React, { useRef, useState } from 'react'
const RicycleBin = ()=>{
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.33333L12.7775 14.4517C12.7476 14.8722 12.5594 15.2657 12.2509 15.553C11.9424 15.8403 11.5366 16 11.115 16H4.21833C3.79678 16 3.39089 15.8403 3.0824 15.553C2.77392 15.2657 2.58576 14.8722 2.55583 14.4517L1.83333 4.33333M6 7.66667V12.6667M9.33333 7.66667V12.6667M10.1667 4.33333V1.83333C10.1667 1.61232 10.0789 1.40036 9.92259 1.24408C9.76631 1.0878 9.55435 1 9.33333 1H6C5.77899 1 5.56702 1.0878 5.41074 1.24408C5.25446 1.40036 5.16667 1.61232 5.16667 1.83333V4.33333M1 4.33333H14.3333" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
}
const Groups = () => {
    const {groups,addGroup,removeGroup,selectedGroupID,setGroupID} = useData();
    const selectedGroupName = useRef('');
    const {addGroupDB,removeGroupDB} = useDB();
    const [popup, setpopup] = useState({delete:false,modify:false,create:false});
    const openPopup = (type:string,groupID?:number,groupName?:string) => {
        if(groupID && groupName) {
            setGroupID(groupID);
            selectedGroupName.current = groupName;
        };
        switch (type) {
            case 'delete':
                setpopup({delete:true,modify:false,create:false});
                break;
            case 'modify':
                setpopup({delete:false,modify:true,create:false});
                break;
            case 'create':
                setpopup({delete:false,modify:false,create:true});
                break;
            case 'close':
                setpopup({delete:false,modify:false,create:false});
                break;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createGroup = (e:any)=>{
        e.preventDefault();
        const groupName = e.target.groupName.value;
        const id = Math.floor(Math.random() * 10000);
        addGroup({id,name:groupName,creationTime:new Date().toISOString()});
        addGroupDB({
            id,
            name:groupName,
            creationTime:new Date().toISOString()
        })
        setpopup({delete:false,modify:false,create:false});
    };
    const deleteGroup = ()=>{
        setGroupID(0);
        removeGroup(selectedGroupID);
        removeGroupDB(selectedGroupID);
        setpopup({delete:false,modify:false,create:false});
    }
    return (
    <div className='w-[320px] h-auto min-h-[425px] max-h-[425px] overflow-hidden relative border-[1px] border-[#CCCCCC] rounded-[10px] px-5 py-4'>
        {(popup.delete || popup.modify || popup.create) &&
            <div onClick={()=>openPopup('close')} className='absolute h-full w-full z-10 left-0 top-0 bg-black opacity-60'></div>
        }
        {popup.delete && 
        (<div className='absolute z-20 top-0 left-0 right-0 border-[1px] overflow-hidden border-[#000000] bottom-0 mx-auto self-center h-[150px] w-[95%] rounded-[10px]'>
            <div className='h-[80%] w-full bg-black flex justify-evenly items-center flex-col'>
                <h1 className='text-white font-semibold text-[14px] px-4 text-center'>Are you sure, you want to delete Group - {selectedGroupName.current}?</h1>
                <h2 className='text-white font-medium text-[12px] px-4 text-center'>Deleting group will change existing group members to Group All.</h2>
            </div>
            <div className='h-[20%] w-full bg-white flex'>
                <button className='w-[50%] h-full font-bold text-sm hover:bg-black hover:text-white transition-colors duration-100 hover:border-[1px] hover:border-[#ffffff]' onClick={()=>openPopup('close')}>Cancel</button>
                <div className='h-full w-[1px] bg-black'></div>
                <button onClick={deleteGroup} className='w-[50%] h-full font-bold text-sm hover:bg-black hover:text-white transition-colors duration-100 hover:border-[1px] hover:border-[#ffffff]'>Delete</button>
            </div>
        </div>)}
        {popup.create && 
        (<form onSubmit={createGroup} className='absolute z-20 top-0 left-0 right-0 border-[1px] overflow-hidden border-[#000000] bottom-0 mx-auto self-center h-[150px] w-[95%] rounded-[10px]'>
            <div className='h-[80%] w-full bg-black flex justify-evenly flex-col'>
                <label className='text-white font-semibold text-[14px] px-4 text-start'>Group Name:</label>
                <input required maxLength={50} placeholder='Enter Group Name' name='groupName' type='text' className='h-[35px] w-[90%] mx-auto rounded-[10px] px-2 bg-white border-[1px] border-[#000000] text-black text-[14px] outline-none focus:outline-none focus:border-[#000000]'/>
            </div>
            <div className='h-[20%] w-full bg-white flex'>
                <button type='button' className='w-[50%] h-full font-bold text-sm hover:bg-black hover:text-white transition-colors duration-100 hover:border-[1px] hover:border-[#ffffff]' onClick={()=>openPopup('close')}>Cancel</button>
                <div className='h-full w-[1px] bg-black'></div>
                <button type='submit' className='w-[50%] h-full font-bold text-sm hover:bg-black hover:text-white transition-colors duration-100 hover:border-[1px] hover:border-[#ffffff]'>Create</button>
            </div>
        </form>)}
        
        <h1 className='font-bold'>Groups</h1>
        <div className='flex flex-col gap-2 mt-3 h-[275px] overflow-auto'>
            <button onClick={()=>setGroupID(0)} className={`w-full font-bold min-h-[38px] flex ${selectedGroupID===0 ? 'bg-black text-white' : 'border-[1px] border-[#CCCCCC] text-black'} rounded-[10px] items-center px-4`}>
                All
            </button>
            {groups.map((item) => (
                <div key={item.id} className={`w-full min-h-[38px] justify-between border-[1px] ${selectedGroupID===item.id ? 'bg-black' : 'border-[#CCCCCC]'} rounded-[10px] flex`}>
                    <button onClick={()=>setGroupID(item.id)} className={`w-[80%] font-medium ${selectedGroupID===item.id ? 'text-white' : 'text-black'} text-[14px] min-h-[38px] flex items-center px-4`}>
                        {item.name}
                    </button>
                    <button onClick={()=>openPopup('delete',item.id,item.name)} className='w-[20%] font-medium text-black text-[14px] min-h-[38px] flex justify-end items-center px-4'>
                        <RicycleBin/>
                    </button>
                </div>
            ))}
        </div>
        <button onClick={()=>openPopup('create')} className='w-full font-bold text-black text-[14px] min-h-[38px] flex border-[1px] border-[#000000] justify-center mt-10 rounded-[10px] items-center px-4'>
            Create a Group
        </button>
    </div>
  )
}

export default Groups