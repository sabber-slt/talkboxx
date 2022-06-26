import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AudioScreen from '../audio/AusioScreen';
import Voices from '../audio/Voices';

export default function Modal({ newsid, title }) {
  const [size, setSize] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  return (
    <>
      <Button
        as={motion.button}
        initial={{ scale: 1 }}
        whileHover={{ scale: 0.7 }}
        position="fixed"
        bottom="20"
        right="0"
        bg="white"
        onClick={() => handleClick('full')}
        m={4}
      >
        <Image
          alt=""
          bg="white"
          src="/image/talkk.png"
          borderRadius={100}
          w="32"
          h="32"
        />
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent opacity={0.9}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text mt="5" textAlign="center" color="#BA00BF">
              {title}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Voices newsid={newsid} />
          </DrawerBody>
          <DrawerFooter my="8">
            <AudioScreen newsid={newsid} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
