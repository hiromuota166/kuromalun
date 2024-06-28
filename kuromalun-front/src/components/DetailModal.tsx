import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react';

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

interface DetailModalProps {
  circle: Circle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DetailModal({ circle, isOpen, onClose }: DetailModalProps) {
  if (!circle) return null;

  const renderLinks = (links: any) => {
    if (Array.isArray(links)) {
      return links.map((link: { url: string; title: string }, index: number) => (
        <div key={index}>
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {link.title}
          </a>
        </div>
      ));
    } else {
      return <p>Invalid link format</p>;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>サークル詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>サークル画像</FormLabel>
            <img src={circle.circlesImageId} alt={circle.name} className="w-full h-64 object-cover mb-4" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>サークル名</FormLabel>
            <Input value={circle.name} isReadOnly />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>活動内容</FormLabel>
            <Textarea value={circle.activity || 'No activity information available'} isReadOnly />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>活動場所</FormLabel>
            <Input value={circle.place || 'No place information available'} isReadOnly />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>活動時間</FormLabel>
            <Input value={circle.time || 'No time information available'} isReadOnly />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>人数</FormLabel>
            <Input value={circle.size || 'No size information available'} isReadOnly />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>リンク</FormLabel>
            {circle.link ? renderLinks(circle.link) : <Input value="No link information available" isReadOnly />}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
