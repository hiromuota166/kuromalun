'use client'
import { Icon } from '@chakra-ui/react'
import React from 'react'
import { IoPersonCircle } from 'react-icons/io5'

const UserIcon = () => {
  return (
    <div className='p-2 justify-center content-center '>
      <a href="/set" title='userIcon'>
        <Icon as={IoPersonCircle} w={8} h={8} color={'#000'}/>
      </a>
    </div>
  )
}

export default UserIcon
