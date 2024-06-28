"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { DetailModal } from '@/components/DetailModal';
import { useDisclosure } from '@chakra-ui/hooks';
import { Divider } from '@chakra-ui/react'
import CircleOwnerIcon from '@/components/CircleOwnerIcon';

interface Circle {
  uid: string;
  name: string;
  circlesImageId: string;
  activity?: string;
  place?: string;
  time?: string;
  size?: string;
  link?: string;
  ownerId?: string;
}

interface User {
  userId: string;
  userImage: string;
}

const Page = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const listAllImage = async () => {
    const { data: circlesData, error: circlesError } = await supabase.from('circles').select('uid, name, circlesImageId, activity, place, time, size, link, ownerId');
    if (circlesError) {
      return;
    }

    if (Array.isArray(circlesData)) {
      setCircles(circlesData as Circle[]);
      const ownerIds = circlesData.map(circle => circle.ownerId);

      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('userId, userImage')
        .in('userId', ownerIds);

      if (usersError) {
        console.error('Error fetching users:', usersError);
        return;
      }

      const usersMap: { [key: string]: User } = {};
      if (Array.isArray(usersData)) {
        usersData.forEach((user: User) => {
          usersMap[user.userId] = user;
        });
      } else {
        console.error('Unexpected data format:', usersData);
      }

      setUsers(usersMap);
    } else {
      console.error('Unexpected data format:', circlesData);
    }
  };

  useEffect(() => {
    listAllImage();
  }, []);

  const handleCircleClick = (circle: Circle) => {
    setSelectedCircle(circle);
    onOpen();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold my-4">サークル一覧</h1>
      <div className="flex flex-wrap mx-3">
        {circles.map(circle => (
          <div key={circle.uid} className="w-full p-2">
            <div
              onClick={() => handleCircleClick(circle)}
              className="cursor-pointer rounded-2xl overflow-hidden flex flex-col items-center border relative"
            >
              <div className="w-full h-48 rounded-2xl overflow-hidden relative md:h-96">
                <img
                  src={circle.circlesImageId}
                  alt={circle.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className='px-4 w-full h-24 text-center'>
                <div className="truncate h-1/2 items-center justify-start flex">
                  <p className="truncate text-xl">{circle.activity}</p>
                </div>
                <div className=''>
                  <Divider orientation='horizontal' width='100%' />
                </div>
                <div className="truncate h-1/2 items-center justify-start flex">
                  {circle.ownerId && users[circle.ownerId] && (
                    <CircleOwnerIcon w={32} h={32} avatarUrl={users[circle.ownerId].userImage} />
                  )}
                  <p className="truncate pl-2">{circle.name}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DetailModal circle={selectedCircle} isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Page;
