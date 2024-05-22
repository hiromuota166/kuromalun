'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import SettingIcon from './SettingIcon'
import UserIcon from './UserIcon'

const Navigation: React.FC = () => {
  const pathname = usePathname()

  const getLinkClasses = (path: string): string => {
    return pathname === path ? 'py-3 px-4 block font-bold border-b-2 text-black' : 'py-3 px-4 block'
  }

  return (
    <div>
      <nav className='fixed z-50 bg-backgroundColor w-full flex justify-between items-center'>
        <ul className='items-center flex'>
          <li className='justify-center'>
            <a href="/" className={getLinkClasses('/')}>ホーム</a>
          </li>
          <li className='justify-center'>
            <a href="/circleCreateEdit" className={getLinkClasses('/circleCreateEdit')}>作成</a>
          </li>
        </ul>
        <ul className=''>
          <UserIcon/>
        </ul>
      </nav>
      <div></div>
    </div>
  )
}

export default Navigation
