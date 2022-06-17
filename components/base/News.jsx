import { Box, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { fetchNews } from '../../utils/useFetch';

const News = () => {
  const { data, isLoading } = useQuery(['news', 'en'], () => fetchNews('en'));
  if (isLoading) {
    return <Box></Box>;
  }
  console.log(data);

  return (
    <Flex w="full" h="full" flexDirection="column" my="16" alignItems="center">
      {data.data.news.map((news) => (
        <Box key={news.id}>
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
              my="5"
              bg="gray.200"
              borderRadius={10}
              overflow="hidden"
              h="56"
              w="96"
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
  );
};

export default News;
