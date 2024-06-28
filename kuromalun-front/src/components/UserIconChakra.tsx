'use client';
import React, { useState, useEffect } from 'react';
import { Icon } from '@chakra-ui/react';
import { IoPersonCircle } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import ConfirmationDialog from './ConfirmationDialog';

interface UserIconProps {
  w: number;
  h: number;
}

const UserIconChakra = ({ w, h }: UserIconProps) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertStatus, setAlertStatus] = useState<"error" | "info" | "warning" | "success" | "loading">("info");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAlertMessage(`ログアウトに失敗しました: ${error.message}`);
      setAlertStatus("error");
    } else {
      router.push('/');
    }
    setIsAlertOpen(true);
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

  const handleNavigation = async (path: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      router.push(path);
    } else {
      setAlertMessage('ログインしてください');
      setAlertStatus("warning");
      setIsAlertOpen(true);
      router.push('/login');
    }
  };

  const confirmLogout = () => {
    setAlertMessage('本当にログアウトしますか？');
    setAlertStatus("warning");
    setShowConfirm(true);
    setIsAlertOpen(true);
  };

  return (
    <div className='relative justify-center content-center'>
      {alertMessage && (
        <ConfirmationDialog 
          message={alertMessage} 
          colorScheme={alertStatus} 
          isOpen={isAlertOpen}
          onClose={() => {
            setIsAlertOpen(false);
            setShowConfirm(false);
          }}
          showConfirmButtons={showConfirm}
          onConfirm={handleLogout}
        />
      )}
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
          <MenuItem onClick={() => handleNavigation('/user')}>
            User Page
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/set')}>
            Settings
          </MenuItem>
          <MenuItem onClick={confirmLogout}>
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default UserIconChakra;

