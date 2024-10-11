import React, { useState } from 'react'
import TSDocs from './Typescript/TSDocs';
import JSDocs from './Javascript/JSDocs';

const Integration = () => {
    const [type, setType] = useState('typescript');
  return (
    <div>
        <div className='flex mt-4'>
            <button onClick={()=>setType('typescript')} className={`flex justify-center items-center px-4 font-bold ${type === 'typescript' ? 'bg-black text-white text-sm' : 'bg-white text-black'} py-1 mx-auto rounded-[10px]`}>Typescript - Nodejs</button>
            <button onClick={()=>setType('javascript')} className={`flex justify-center items-center px-4 font-bold ${type === 'javascript' ? 'bg-black text-white text-sm' : 'bg-white text-black'} py-1 mx-auto  rounded-[10px]`}>Javascript - Nodejs</button>
        </div>
        {type === 'typescript' && <TSDocs/>}
        {type === 'javascript' && <JSDocs/>}

    </div>
  )
}

export default Integration