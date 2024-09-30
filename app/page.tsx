import Home from '@/components/Home'
import { ThresholdProvider } from '@/helpers/Alerts'
import { DataProvider } from '@/helpers/Data'
import { SettingsProvider } from '@/helpers/Settings'
import React from 'react'

const page = () => {
  return (
    <DataProvider>
      <SettingsProvider>
        <ThresholdProvider>
          <Home/>
        </ThresholdProvider>
      </SettingsProvider>
    </DataProvider>
  )
}

export default page