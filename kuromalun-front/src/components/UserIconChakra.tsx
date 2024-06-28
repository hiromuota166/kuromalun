'use client'
import React, { useState, useEffect } from 'react';
import { Icon } from '@chakra-ui/react';
import { IoPersonCircle } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

interface UserIconProps {
  w: number;
  h: number;
}

const UserIconChakra = ({ w, h }: UserIconProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    const confirmed = confirm('本当にログアウトしますか？');
    if (confirmed) {
      await supabase.auth.signOut();
      router.push('/');
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const fetchUserImage = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('userImage')
          .eq('userId', user.id)
          .single();
        if (userData) {
          setUserImage(userData.userImage);
        }
      }
    };
    fetchUserImage();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = async (path: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      router.push(path);
    } else {
      alert('ログインしてください。');
      router.push('/login');
    }
    setMenuOpen(false);
  };

  return (
    <div className='relative justify-center content-center'>
      <Menu isLazy>
        <MenuButton>
          <div className='cursor-pointer'>
            {userImage ? (
              <img
                src={userImage}
                alt="User Icon"
                className='rounded-full'
                style={{ width: w, height: h }}
              />
            ) : (
              <Icon as={IoPersonCircle} w={w} h={h} color={'#000'} />
            )}
          </div>
        </MenuButton>
        <MenuList>
          <div className=''>
            <MenuItem>
              <a
                href="#"
                onClick={() => handleNavigation('/user')}
                className=''
              >
                User Page
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                onClick={() => handleNavigation('/set')}
                className=''
              >
                Settings
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                onClick={handleLogout}
                className=''
              >
                Log Out
              </a>
            </MenuItem>
          </div>
        </MenuList>
      </Menu>
    </div>
  );
};

export default UserIconChakra;
