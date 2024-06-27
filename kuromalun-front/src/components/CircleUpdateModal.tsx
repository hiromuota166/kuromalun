import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Textarea } from '@chakra-ui/react';
import { supabase } from '../utils/supabase';
import { v4 as uuidv4 } from 'uuid';

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

interface CircleUpdateModalProps {
  circle: Circle | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const CircleUpdateModal: React.FC<CircleUpdateModalProps> = ({ circle, isOpen, onClose, onUpdate }) => {
  const [editedCircle, setEditedCircle] = useState<Circle | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (circle) {
      setEditedCircle(circle);
      setPreviewUrl(circle.circlesImageId || null);
    }
  }, [circle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editedCircle) {
      setEditedCircle({ ...editedCircle, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = async () => {
    if (!editedCircle) return;

    setIsLoading(true);
    let circlesImageUrl = editedCircle.circlesImageId;

    if (file) {
      const fileExtension = file.name.split('.').pop();
      const filePath = `circle-image/${uuidv4()}.${fileExtension}`;
      const { error: uploadError } = await supabase.storage.from('circle-image').upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        setIsLoading(false);
        return;
      }

      const { data: urlData } = await supabase.storage.from('circle-image').getPublicUrl(filePath);
      circlesImageUrl = urlData.publicUrl;
    }

    const { error } = await supabase
      .from('circles')
      .update({
        name: editedCircle.name,
        circlesImageId: circlesImageUrl,
        activity: editedCircle.activity,
        place: editedCircle.place,
        time: editedCircle.time,
        size: editedCircle.size,
        link: editedCircle.link,
      })
      .eq('uid', editedCircle.uid);

    if (error) {
      console.error('Error updating circle:', error);
    } else {
      onUpdate();
      onClose();
    }

    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>サークル詳細編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {editedCircle && (
            <div>
              <Input
                name="name"
                value={editedCircle.name}
                onChange={handleChange}
                placeholder="サークル名"
                mb={3}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                mb={3}
              />
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded mb-3" />
              )}
              <Textarea
                name="activity"
                value={editedCircle.activity || ''}
                onChange={handleChange}
                placeholder="活動内容"
                mb={3}
              />
              <Input
                name="place"
                value={editedCircle.place || ''}
                onChange={handleChange}
                placeholder="活動場所"
                mb={3}
              />
              <Input
                name="time"
                value={editedCircle.time || ''}
                onChange={handleChange}
                placeholder="活動時間"
                mb={3}
              />
              <Input
                name="size"
                value={editedCircle.size || ''}
                onChange={handleChange}
                placeholder="メンバー数"
                mb={3}
              />
              <Input
                name="link"
                value={editedCircle.link || ''}
                onChange={handleChange}
                placeholder="リンク"
                mb={3}
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave} isLoading={isLoading}>
            保存
          </Button>
          <Button variant="ghost" onClick={onClose}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
