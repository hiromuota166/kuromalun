'use client'
import { IconContext } from 'react-icons' 
import DefaultIcon from "./DefaultIcon"
import { IoSettingsOutline } from "react-icons/io5";

const SettingIcon = () => {
  return (
    <IconContext.Provider value={{ color: '#fff'}}>
      <a href="/set" aria-label="設定に飛ぶ">
        <DefaultIcon icon={IoSettingsOutline} width={6} height={6} />
      </a>
    </IconContext.Provider>
  )
}

export default SettingIcon