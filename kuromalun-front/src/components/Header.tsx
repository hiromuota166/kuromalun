'use client'
import { SettingsIcon } from '@chakra-ui/icons'

const Header = () => {
  return (
    <header className="shadow-boxOut bg-backgroundColor fixed flex w-full justify-between relative">
      <div>
        <h1 className="p-4 pt-6 text-3xl text-mainColor">
          <a href="/" className=''>kuromalun</a>
        </h1>
      </div>
      <div className="items-center flex p-4">
      </div>
    </header>
  )
}

export default Header