import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex lg:flex-row flex-col justify-center xl:justify-between my-6 itmes-center'>
        <div className='md:min-w-[400px] px-2 max-w-[850px] h-auto md:h-[50px] bg-black flex justify-center items-center rounded-[10px]'>
            <h1 className='text-white font-medium'><span className='font-bold mr-4'>Warning -</span> Site uses local browser storage to store details regarding servers, data may get deleted.</h1>
        </div>
        <div className='lg:w-[50px]'></div>
        <div className='flex lg:mx-0 mx-auto lg:mt-0 mt-2 items-center gap-8'>
            <Link className='font-bold' href={'/cloud'}>Cloud</Link>
            {/* <Link className='font-bold' href={'/'}>Docs</Link> */}
            <Link className='font-bold' href={'/docs'}>Get Started</Link>
        </div>
    </nav>
  )
}

export default Navbar