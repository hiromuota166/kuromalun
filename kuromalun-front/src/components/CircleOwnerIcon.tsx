'use client'
import React, { useState, useEffect } from 'react';
import { Icon } from '@chakra-ui/react';
import { IoPersonCircle } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';

interface CircleOwnerIconProps {
  w: number;
  h: number;
  avatarUrl?: string;
}

const CircleOwnerIcon = ({ w, h, avatarUrl }: CircleOwnerIconProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('userImage')
          .eq('userId', user.id)
          .single();
        if (error) {
          console.error('Error fetching user image:', error);
        } else {
          if (userData) {
            setUserImage(userData.userImage);
          }
        }
      }
    };
    fetchUserImage();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='relative justify-center content-center'>
      <div onClick={toggleMenu} className='cursor-pointer'>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User Icon"
            className='rounded-full'
            style={{ width: w, height: h }}
          />
        ) : userImage ? (
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
    </div>
  );
};

export default CircleOwnerIcon;
