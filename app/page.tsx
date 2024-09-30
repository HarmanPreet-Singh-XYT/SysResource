import Home from '@/components/Home'
import { DataProvider } from '@/helpers/Data'
import { SettingsProvider } from '@/helpers/Settings'
import React from 'react'

const page = () => {
  return (
    <DataProvider>
      <SettingsProvider>
        <Home/>
      </SettingsProvider>
    </DataProvider>
  )
}

export default page