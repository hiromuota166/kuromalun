"use client";

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
      console.log('Error fetching circles:', error);
      return;
    }

    console.log('Fetched circles data:', data);

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
    console.log('Circle clicked:', circle);
    setSelectedCircle(circle);
    onOpen();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold my-4">サークル一覧</h1>
      <div className="flex flex-wrap mx-3">
        {circles.map(circle => (
          <div key={circle.uid} className="w-1/4 p-2">
            <div
              onClick={() => handleCircleClick(circle)}
              className="cursor-pointer rounded-lg overflow-hidden flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden">
                <img
                  src={circle.circlesImageId}
                  alt={circle.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <p className="w-20 text-center mt-2 truncate">{circle.name}</p>
            </div>
          </div>

        ))}
      </div>
      <DetailModal circle={selectedCircle} isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Page;
