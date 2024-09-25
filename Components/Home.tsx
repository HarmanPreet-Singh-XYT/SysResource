import React from 'react'
import Navbar from './Home/Navbar'
import Groups from './Home/Groups'
import BottomBtns from './Home/BottomBtns'
import Server from './Home/Server'

const Home = () => {
  return (
    <div className='flex justify-center h-screen w-full'>
      <div className='w-[70%] h-full'>
        <Navbar/>
        <div className='flex justify-between h-[88%]'>
          <div className='flex flex-col justify-between'>
            <Groups/>
            <BottomBtns/>
          </div>
          <div className='min-w-[950px] overflow-auto h-full'>
            <Server name='Server 1' ip='237.84.2.178' domain='server1.com' isRunning={true} uptime='3 days ago' type='Production' cpuUsage={30} availMemory={1000} usedMemory={1000} totalMemory={2000} platform='Linux' environment='NodeJS'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home