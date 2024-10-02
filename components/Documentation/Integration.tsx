import React, { useState } from 'react'
import TSDocs from './Typescript/TSDocs';

const Integration = () => {
    const [type, setType] = useState('typescript');
  return (
    <div>
        <div className='flex mt-4'>
            <button onClick={()=>setType('typescript')} className='flex justify-center items-center px-4 font-bold text-sm py-1 mx-auto bg-black text-white rounded-[10px]'>Typescript - Nodejs</button>
        </div>
        {type === 'typescript' && <TSDocs/>}

    </div>
  )
}

export default Integration