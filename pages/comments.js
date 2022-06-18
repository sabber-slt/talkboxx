import { Box, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Loading from '../components/animation/Loading';
import useUser from '../utils/store/useUser';
import { userComment } from '../utils/useFetch';

const Home = () => {
  const { user } = useUser();

  const { data, isLoading } = useQuery(['comments', user?.id], () =>
    userComment(user?.id)
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box py="16">
      <Box position="fixed" top={0} w="full" h="100vh" bg="purple.800">
        <Box position="relative" h="100vh" opacity={0.6}>
          <Image
            alt=""
            src="https://res.cloudinary.com/dupfwlkgb/image/upload/v1655465274/pexels-lilartsy-4717873_thfjej.jpg"
            layout="fill"
            priority
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>
      <Box w="full">
        <Flex
          zIndex={100}
          w="full"
          h="full"
          flexDirection="column"
          alignItems="center"
        >
          {data.data.news.map((news) => (
            <Box zIndex={100} key={news.id}>
              <Link
                href={{
                  pathname: '/news',
                  query: {
                    id: news.id,
                    img: news.img,
                    title: news.title,
                    content: news.content,
                    source: news.source,
                  },
                }}
                passhref="true"
              >
                <HStack
                  zIndex={100}
                  my="5"
                  bg="gray.200"
                  borderRadius={10}
                  overflow="hidden"
                  h="56"
                  w="96"
                  shadow="xl"
                >
                  <Box position="relative" zIndex={0} w="48" h="56">
                    <Image alt="" src={news.img} layout="fill" />
                  </Box>
                  <VStack h="56" justifyContent="space-around">
                    <Box w="52">
                      <Text
                        px="3"
                        fontSize={15}
                        textAlign="center"
                        fontWeight={300}
                        color="gray.700"
                      >
                        {news.title}
                      </Text>
                    </Box>
                    <Box w="56">
                      <Text
                        px="2"
                        fontSize={12}
                        textAlign="center"
                        color="gray.700"
                        fontWeight={300}
                      >
                        {news.content.slice(0, 100)}...
                      </Text>
                    </Box>
                    <Box w="52">
                      <HStack w="52" justifyContent="space-between" px="2">
                        <Center>
                          <Image
                            alt=""
                            src="/image/audio.png"
                            width={28}
                            height={28}
                          />
                          <Text ml="1">{news.voices.length}</Text>
                        </Center>
                        <Text>{news.source}</Text>
                      </HStack>
                    </Box>
                  </VStack>
                </HStack>
              </Link>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
