"use client";

import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import AlertComponent from '../../components/AlertComponent';

const CircleCreateEditPage: React.FC = () => {
  const [name, setName] = useState("");
  const [activity, setActivity] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [size, setSize] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertColorScheme, setAlertColorScheme] = useState<string>("red");
  const router = useRouter();

  const public_url = "https://ntbxlozqezrwdpqphirl.supabase.co/storage/v1/object/public/circle-image/"

  const handleChangeFile = (e: any) => {
    if (e.target.files.length !== 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setAlertMessage("ログインしてください");
      setIsLoading(false);
      return;
    }

    if (file && file.type.match("image.*")) {
      // 画像の拡張子を取得
      const fileExtension = file.name.split(".").pop();
      const filePath = `img/${uuidv4()}.${fileExtension}`;

      // 画像をアップロード
      const { error: uploadError } = await supabase.storage
        .from('circle-image')
        .upload(filePath, file);

      // アップロードエラーがあればアラート表示
      if (uploadError) {
        setAlertMessage("エラーが発生しました：" + uploadError.message);
        setIsLoading(false);
        return;
      }
      const fileUrl = `${public_url}${filePath}`;

      const newCircle = {
        name,
        activity,
        place,
        time,
        size,
        link: [{ title: linkTitle, url: linkUrl }],
        ownerId: user.id,
        circlesImageId: fileUrl,
      };

      const { error: insertError } = await supabase.from('circles').insert([newCircle]);

      // 挿入エラーがあればアラート表示
      if (insertError) {
        setAlertMessage("エラーが発生しました：" + insertError.message);
        setIsLoading(false);
        return;
      }

      // アップロードと挿入が成功したらファイルとプレビューをリセット
      setFile(null);
      setPreviewUrl(null);
    } else {
      // 画像ファイル以外はアラート表示
      setAlertMessage("画像ファイル以外はアップロード出来ません。");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    router.push('/user');
  };

  return (
    <div className='h-[calc(100vh-56px)] flex flex-col items-center bg-backgroundColor text-mainColor'>
      <form className='w-full flex-1 flex flex-col items-center justify-start' onSubmit={handleSubmit}>
        <div className='w-4/5'>
          <div className=''>
            <p className=''>サークル画像</p>
          </div>
          <input
            aria-label='サークル画像'
            type='file'
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            onChange={handleChangeFile}
          />
        </div>
        <div className='w-4/5'>
          <div className=''>
            <p className=''>サークル名</p>
          </div>
          <input
            placeholder="ものづくりサークル"
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='w-4/5'>
          <div className=''>
            <p className=''>活動内容</p>
          </div>
          <input
            placeholder="イベントたくさん！"
            className='w-full h-16 rounded-xl p-2 mt-2 border-2'
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
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
      {alertMessage && (
        <AlertComponent 
          message={alertMessage} 
          colorScheme={alertColorScheme} 
          onClose={() => setAlertMessage(null)} 
        />
      )}
    </div>
  );
};

export default CircleCreateEditPage;