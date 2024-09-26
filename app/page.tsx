import Home from '@/Components/Home'
import { DataProvider } from '@/Helpers/Data'
import React from 'react'

const page = () => {
  return (
    <DataProvider>
      <Home/>
    </DataProvider>
  )
}

export default page