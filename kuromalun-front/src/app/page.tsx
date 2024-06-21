"use client"

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { DetailModal } from '@/components/DetailModal';
import { useDisclosure } from '@chakra-ui/hooks';

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

const Page = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 画像と名前を全て取得し、ステートに保存
  const listAllImage = async () => {
    const { data, error } = await supabase.from('circles').select('uid, name, circlesImageId, activity, place, time, size, link');
    if (error) {
      console.log(error);
      return;
    }

    if (Array.isArray(data)) {
      setCircles(data as Circle[]);
    } else {
      console.error('Unexpected data format:', data);
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
      <h1 className="text-center text-2xl font-bold mb-4">サークル一覧</h1>
      <div className="flex flex-wrap">
        {circles.map(circle => (
          <div key={circle.uid} className="w-1/4 p-2">
            <div onClick={() => handleCircleClick(circle)} className="cursor-pointer">
              <img src={circle.circlesImageId} alt={circle.name} className="w-full h-32 object-cover" />
              <p className="text-center mt-2">{circle.name}</p>
            </div>
          </div>
        ))}
      </div>
      <DetailModal circle={selectedCircle} isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Page;
