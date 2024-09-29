import Home from '@/components/Home'
import { DataProvider } from '@/helpers/Data'
import React from 'react'

const page = () => {
  return (
    <DataProvider>
      <Home/>
    </DataProvider>
  )
}

export default page