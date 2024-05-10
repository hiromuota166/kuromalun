'use client'
import SettingIcon from './SettingIcon'

const Header = () => {
  return (
    <header className="shadow-boxOut bg-backgroundColor flex w-full justify-between">
      <div>
        <h1 className="p-4 pt-6 text-3xl text-mainColor">
          <a href="/" className=''>kuromalun</a>
        </h1>
      </div>
      <div className="items-end flex p-4">
        <SettingIcon />
      </div>
    </header>
  )
}

export default Header