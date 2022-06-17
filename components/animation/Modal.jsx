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
        position="fixed"
        bottom="20"
        h="20"
        w="20"
        bg="pink.100"
        borderRadius={100}
        right="5"
        shadow="lg"
        onClick={() => handleClick('full')}
        m={4}
      >
        <Image alt="" src="/image/micon.svg" w="20" h="20" />
      </Button>

      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text mt="5" textAlign="center" color="purple.600">
              {title}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Voices newsid={newsid} />
          </DrawerBody>
          <DrawerFooter>
            <AudioScreen newsid={newsid} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
