import { Box, Center, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <>
      <Box>
        <Center position="fixed" w="full" h="16" bg="gray.100" zIndex={110}>
          <Text fontWeight="extrabold" fontSize={18} color="#BA00BF">
            TALK BOX
          </Text>
        </Center>
        {children}
        <Center>
          <Center
            bottom={0}
            position="fixed"
            w="full"
            h="14"
            bg="gray.100"
            zIndex={110}
            justifyContent="space-between"
            px="16"
          >
            <Link href="/">
              <a>
                <Image
                  alt=""
                  src={'/image/home.png'}
                  width={40}
                  height={40}
                  style={{ opacity: 0.7 }}
                />
              </a>
            </Link>
            <Link href="/profile">
              <a>
                <Image
                  alt=""
                  src={'/image/user.png'}
                  width={40}
                  height={40}
                  style={{ opacity: 0.7 }}
                />
              </a>
            </Link>
          </Center>
        </Center>
      </Box>
    </>
  );
};

export default Layout;
