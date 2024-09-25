'use client'
import React, { useState } from 'react'
const RicycleBin = ()=>{
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.33333L12.7775 14.4517C12.7476 14.8722 12.5594 15.2657 12.2509 15.553C11.9424 15.8403 11.5366 16 11.115 16H4.21833C3.79678 16 3.39089 15.8403 3.0824 15.553C2.77392 15.2657 2.58576 14.8722 2.55583 14.4517L1.83333 4.33333M6 7.66667V12.6667M9.33333 7.66667V12.6667M10.1667 4.33333V1.83333C10.1667 1.61232 10.0789 1.40036 9.92259 1.24408C9.76631 1.0878 9.55435 1 9.33333 1H6C5.77899 1 5.56702 1.0878 5.41074 1.24408C5.25446 1.40036 5.16667 1.61232 5.16667 1.83333V4.33333M1 4.33333H14.3333" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
}
const Groups = () => {
    const array = ['South East Asia','Middle-East','Europe','North America','South America','Africa','Australia'];
    const [selectedGroup, setselectedGroup] = useState({groupID:0,groupName:''});
    const [popup, setpopup] = useState({delete:true,modify:false});
    const openPopup = (type:string,groupID:number,groupName:string) => {
        setselectedGroup({groupID,groupName});
        switch (type) {
            case 'delete':
                setpopup({delete:true,modify:false});
                break;
            case 'modify':
                setpopup({delete:false,modify:true});
                break;
            case 'close':
                setpopup({delete:false,modify:false});
                break;
        }
    }
    return (
    <div className='w-[320px] h-auto min-h-[425px] max-h-[425px] overflow-hidden relative border-[1px] border-[#CCCCCC] rounded-[10px] px-5 py-4'>
        {(popup.delete || popup.modify) &&
            <div className='absolute h-full w-full z-10 left-0 top-0 bg-black opacity-60'></div>
        }
        {popup.delete && 
        (<div className='absolute z-20 top-0 left-0 right-0 border-[1px] overflow-hidden border-[#000000] bottom-0 mx-auto self-center h-[150px] w-[95%] rounded-[10px]'>
            <div className='h-[80%] w-full bg-black flex justify-evenly items-center flex-col'>
                <h1 className='text-white font-semibold text-[14px] px-4 text-center'>Are you sure, you want to delete Group - {selectedGroup.groupName}?</h1>
                <h2 className='text-white font-medium text-[12px] px-2 text-center'>Deleting group will change existing group members to Group All.</h2>
            </div>
            <div className='h-[20%] w-full bg-white flex'>
                <button className='w-[50%] h-full font-bold text-sm hover:bg-black hover:text-white transition-colors duration-100 hover:border-[1px] hover:border-[#ffffff]' onClick={()=>openPopup('close',123,'abc')}>Cancel</button>
                <div className='h-full w-[1px] bg-black'></div>
                <button className='w-[50%] h-full font-bold text-sm hover:bg-black hover:text-white transition-colors duration-100 hover:border-[1px] hover:border-[#ffffff]'>Delete</button>
            </div>
        </div>)}
        
        <h1 className='font-bold'>Groups</h1>
        <div className='flex flex-col gap-2 mt-3 h-[275px] overflow-auto'>
            <button className='w-full font-bold text-white min-h-[38px] flex bg-black rounded-[10px] items-center px-4'>
                All
            </button>
            {array.map((item,index) => (
                <div key={index} className='w-full min-h-[38px] justify-between border-[1px] border-[#CCCCCC] rounded-[10px] flex'>
                    <button className='w-[80%] font-medium text-black text-[14px] min-h-[38px] flex items-center px-4'>
                        {item}
                    </button>
                    <button onClick={()=>openPopup('delete',index,item)} className='w-[20%] font-medium text-black text-[14px] min-h-[38px] flex justify-end items-center px-4'>
                        <RicycleBin/>
                    </button>
                </div>
            ))}
        </div>
        <button className='w-full font-bold text-black text-[14px] min-h-[38px] flex border-[1px] border-[#000000] justify-center mt-10 rounded-[10px] items-center px-4'>
            Create a Group
        </button>
    </div>
  )
}

export default Groups