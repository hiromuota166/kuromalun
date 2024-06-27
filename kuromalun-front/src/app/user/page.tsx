"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';
import { CircleUpdateModal } from '@/components/CircleUpdateModal';
import { UserUpdateModal } from '@/components/UserUpdateModal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import UserIcon from '@/components/UserIcon';

interface Circle {
  uid: string;
  name: string;
  circlesImageId: string;
  activity?: string;
  place?: string;
  time?: string;
  size?: string;
  link?: string;
}

interface User {
  uid: string;
  displayName: string;
  userImage?: string;
}

const Page: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { isOpen: isCircleModalOpen, onOpen: onCircleModalOpen, onClose: onCircleModalClose } = useDisclosure();
  const { isOpen: isUserModalOpen, onOpen: onUserModalOpen, onClose: onUserModalClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const router = useRouter();

  const fetchUserData = async () => {
    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
      router.push('/login');
      return;
    }

    setUserEmail(user.email ?? null);
    setUid(user.id);

    // ユーザーのdisplayNameを取得
    const { data: userData } = await supabase
      .from('users')
      .select('displayName, userImage')
      .eq('userId', user.id)
      .single();

    if (userData) {
      setDisplayName(userData.displayName ?? null);
      setPreviewUrl(userData.userImage ?? null);
      setCurrentUser({ uid: user.id, displayName: userData.displayName, userImage: userData.userImage });
    }

    // ユーザーが作成したサークルを取得
    const { data: circleData } = await supabase
      .from('circles')
      .select('uid, name, circlesImageId, activity, place, time, size, link')
      .eq('ownerId', user.id);

    if (circleData) {
      setCircles(circleData);
    }
  };

  useEffect(() => {
    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleUpdate = async () => {
    await fetchUserData();
  };

  const handleCircleClick = (circle: Circle) => {
    setSelectedCircle(circle);
    onCircleModalOpen();
  };

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col items-center bg-gray-100 text-gray-900'>
      <header aria-label='ユーザー情報' className='w-screen bg-yellow-600 md:px-64'>
        <div aria-label='ヘッダー横幅調整' className='h-full px-5'>
          <div aria-label='ヘッダー縦幅調整' className='h-full py-8'>
            <div className=''>
              <div aria-label='画像側'>
                <UserIcon w={84} h={84} />
              </div>
              <div aria-label='名前側' className='mt-4 flex justify-between'>
                <h1 className='text-xl font-bold w-3/4'>{displayName}</h1>
                <button className='border rounded-3xl' onClick={onUserModalOpen}>
                  <p className='px-4'>編集</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div aria-label='付属情報タブ' className='w-screen px-5  md:px-64'>
        <Tabs>
          <TabList>
            <Tab>Your circle</Tab>
            <Tab>Like</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className='w-full flex-1 flex flex-col items-center justify-start overflow-hidden' aria-label='ユーザー付属情報'>
                <h2 className='text-xl font-bold mt-10'>あなたが作成したサークル</h2>
                <ul className='w-4/5 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {circles.map((circle) => (
                    <li key={circle.uid} className='p-2 border rounded shadow cursor-pointer' onClick={() => handleCircleClick(circle)}>
                      <img src={circle.circlesImageId} alt={circle.name} className='w-full h-48 object-cover rounded' />
                      <p className='mt-2 text-center'>{circle.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </TabPanel>
            <TabPanel>
              <div className='w-full flex-1 flex flex-col items-center justify-start overflow-hidden' aria-label='ユーザー付属情報'>
                <h2 className='text-xl font-bold mt-10'>あなたがいいねしたサークル</h2>
                <p>to be continue...</p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <UserUpdateModal user={currentUser} isOpen={isUserModalOpen} onClose={onUserModalClose} onUpdate={handleUpdate} />
      <CircleUpdateModal circle={selectedCircle} isOpen={isCircleModalOpen} onClose={onCircleModalClose} onUpdate={handleUpdate} />
    </div>
  );
};

export default Page;
