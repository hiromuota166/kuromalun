import React from 'react'
import SettingTag from "@/components/SettingTag"

const page = () => {
  return (
    <div className='h-[calc(100vh-56px)] flex flex-col bg-backgroundColor text-mainColor mt-8'>
      <SettingTag title='製作者について' content='watnowの春プロジェクトにて運営中'/>
      <SettingTag title='このアプリについて' content='watnowのメンバー3人で制作されています'/>
    </div>
  )
}

export default page