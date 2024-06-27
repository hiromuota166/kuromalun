'use client'
import React, { useState, useEffect } from 'react';
import { Icon } from '@chakra-ui/react';
import { IoPersonCircle } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';

interface UserIconProps {
  w: number;
  h: number;
}

const UserIcon = ({ w, h }: UserIconProps) => {
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
      <div onClick={toggleMenu} className='cursor-pointer'>
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
      {menuOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg'>
          <a 
            href="#"
            onClick={() => handleNavigation('/user')}
            className='block px-4 py-2 text-black hover:bg-gray-200 bg-backgroundColor hover:text-emphasisColor transition duration-150'
          >
            User Page
          </a>
          <a 
            href="#"
            onClick={() => handleNavigation('/set')}
            className='block px-4 py-2 text-black hover:bg-gray-200 bg-backgroundColor hover:text-emphasisColor transition duration-150'
          >
            Settings
          </a>
          <a 
            href="#"
            onClick={handleLogout}
            className='block px-4 py-2 text-black hover:bg-gray-200 bg-backgroundColor hover:text-emphasisColor transition duration-150'
          >
            Log Out
          </a>
        </div>
      )}
    </div>
  );
};

export default UserIcon;
