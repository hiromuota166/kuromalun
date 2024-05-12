import React from 'react'
import SettingTag from "@/components/SettingTag"

const page = () => {
  return (
    <div className=' h-[calc(100vh-80px)]'>
      <SettingTag title='製作者について' content='watnow'/>
      <SettingTag title='このアプリについて' content='kuromalun'/>
    </div>
  )
}

export default page