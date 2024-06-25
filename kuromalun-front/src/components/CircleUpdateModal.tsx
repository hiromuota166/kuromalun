import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Textarea } from '@chakra-ui/react';
import { supabase } from '../utils/supabase';

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

  useEffect(() => {
    if (circle) {
      setEditedCircle(circle);
    }
  }, [circle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editedCircle) {
      setEditedCircle({ ...editedCircle, [name]: value });
    }
  };

  const handleSave = async () => {
    if (editedCircle) {
      const { error } = await supabase
        .from('circles')
        .update({
          name: editedCircle.name,
          circlesImageId: editedCircle.circlesImageId,
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
    }
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
                name="circlesImageId"
                value={editedCircle.circlesImageId}
                onChange={handleChange}
                placeholder="画像URL"
                mb={3}
              />
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
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            保存
          </Button>
          <Button variant="ghost" onClick={onClose}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
