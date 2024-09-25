import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between my-6 itmes-center'>
        <div className='w-[850px] h-[50px] bg-black flex justify-center items-center rounded-[10px]'>
            <h1 className='text-white font-medium'><span className='font-bold mr-4'>Warning -</span> Site uses local browser storage to store details regarding servers, data may get deleted.</h1>
        </div>
        <div className='flex items-center gap-8'>
            <Link className='font-bold' href={'/'}>Cloud</Link>
            <Link className='font-bold' href={'/'}>Docs</Link>
            <Link className='font-bold' href={'/'}>Alerts</Link>
            <Link className='font-bold' href={'/'}>Get Started</Link>
        </div>
    </nav>
  )
}

export default Navbar