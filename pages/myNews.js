import { CloseIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import useStore from '../utils/store/useStore';
import useUser from '../utils/store/useUser';

const Home = () => {
  const { user } = useUser();
  const { news, delNews } = useStore();
  return (
    <Flex w="full" h="full" flexDirection="column" py="16" alignItems="center">
      <Box>
        {news.map((item, index) => (
          <Box key={index}>
            <Link
              href={{
                pathname: '/news',
                query: {
                  id: item.title,
                  img: item.img,
                  content: item.content,
                  source: item.source,
                },
              }}
              passhref="true"
            >
              <VStack
                justifyContent="flex-end"
                my="5"
                bg="gray.200"
                overflow="hidden"
                h="72"
                w="96"
              >
                <Box position="relative" zIndex={0} w="96" h="72">
                  <Box
                    onClick={() => {
                      delNews(item.title);
                    }}
                    zIndex={100}
                    position="absolute"
                    top="5"
                    right="8"
                  >
                    <CloseIcon zIndex={100} color="white" />
                  </Box>
                  <Image
                    // boxSize="72"
                    w="96"
                    h="72"
                    objectFit="cover"
                    // objectPosition="center"
                    alt=""
                    src={item?.img}
                  />
                </Box>
                <VStack
                  bg="rgba(186,0,191,0.6)"
                  position="absolute"
                  zIndex={100}
                  w="96"
                  h={item.title.length > 80 ? '32' : '24'}
                >
                  <Center h={item.title.length > 80 ? '32' : '24'}>
                    <Text
                      px="5"
                      pt="1"
                      fontSize={user?.language !== 'ir' ? 16 : 18}
                      textAlign="center"
                      fontWeight={700}
                      color="gray.50"
                    >
                      {item.title}
                    </Text>
                  </Center>
                  <Text
                    p="2"
                    fontSize={user?.language !== 'ir' ? 11 : 14}
                    textAlign="center"
                    fontWeight={700}
                    color="gray.50"
                  >
                    {item.source}
                  </Text>
                </VStack>
              </VStack>
            </Link>
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default Home;
