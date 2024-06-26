import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input } from '@chakra-ui/react';
import { supabase } from '../utils/supabase';
import { v4 as uuidv4 } from 'uuid';

interface User {
  uid: string;
  displayName: string;
  userImage?: string;
}

interface UserUpdateModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const UserUpdateModal: React.FC<UserUpdateModalProps> = ({ user, isOpen, onClose, onUpdate }) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEditedUser(user);
      setPreviewUrl(user.userImage || null);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedUser) {
      setEditedUser({ ...editedUser, [name]: value });
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
    if (!editedUser) return;

    setIsLoading(true);
    let userImageUrl = editedUser.userImage;

    if (file) {
      const fileExtension = file.name.split('.').pop();
      const filePath = `user-images/${uuidv4()}.${fileExtension}`;
      const { error: uploadError } = await supabase.storage.from('user-image').upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        setIsLoading(false);
        return;
      }

      const { data: urlData } = await supabase.storage.from('user-image').getPublicUrl(filePath);
      userImageUrl = urlData.publicUrl;
    }

    await supabase
      .from('users')
      .update({
        displayName: editedUser.displayName,
        userImage: userImageUrl,
      })
      .eq('userId', editedUser.uid);

    onUpdate();
    onClose();
    setIsLoading(false);
    // リロード
    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ユーザー情報編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {editedUser && (
            <div>
              <Input
                name="displayName"
                value={editedUser.displayName}
                onChange={handleChange}
                placeholder="表示名"
                mb={3}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                mb={3}
              />
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded" />
              )}
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
