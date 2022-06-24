import { Box, Center, Image } from '@chakra-ui/react';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <>
      <Box>
        <Center position="fixed" w="full" h="16" bg="gray.100" zIndex={110}>
          <Image
            alt=""
            src="/icons/icon-512x512.png"
            boxSize="16"
            bg="gray.100"
          />
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
                  w="12"
                  h="12"
                  style={{ opacity: 0.7 }}
                />
              </a>
            </Link>
            <Link href="/profile">
              <a>
                <Image
                  alt=""
                  src={'/image/user.png'}
                  w="12"
                  h="12"
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
