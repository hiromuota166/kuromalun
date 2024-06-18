"use client";

import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

const CircleCreateEditPage: React.FC = () => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [size, setSize] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("ログインしてください");
      setIsLoading(false);
      return;
    }

    const newCircle = {
      name,
      place,
      time,
      size,
      link: [{ title: linkTitle, url: linkUrl }],
      ownerId: user.id,
    };

    const { error } = await supabase.from('circles').insert([newCircle]);

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert("データが保存されました");
    }

    setIsLoading(false);
  };

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col items-center bg-backgroundColor text-mainColor'>
      <form className='w-full flex-1 flex flex-col items-center justify-start' onSubmit={handleSubmit}>
        <div className='w-4/5'>
          <div className=''>
            <p className=''>活動内容</p>
          </div>
          <input
            placeholder="イベントたくさん！"
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='w-4/5 mt-5'>
          <div className=''>
            <p className=''>活動場所</p>
          </div>
          <input
            placeholder="OIC屋上"
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div className='w-4/5 mt-5'>
          <div className=''>
            <p className=''>活動時間</p>
          </div>
          <input
            placeholder="放課後"
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className='w-4/5 mt-5'>
          <div className=''>
            <p className=''>人数</p>
          </div>
          <input
            placeholder="30人前後"
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className='w-4/5 mt-5'>
          <div className=''>
            <p className=''>リンク</p>
          </div>
          <input
            placeholder="タイトル"
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
          />
          <input
            placeholder="http://example.com"
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='w-4/5 h-16 p-3 mt-10 text-white font-bold rounded-lg shadow-lg bg-emphasisColor hover:bg-backgroundColor hover:text-emphasisColor transition duration-150 active:scale-90'
          disabled={isLoading}
        >
          保存
        </button>
      </form>
    </div>
  );
};

export default CircleCreateEditPage;
