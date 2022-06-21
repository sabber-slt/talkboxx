import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import Link from 'next/link';
import { useQuery } from 'react-query';
import useUser from '../../utils/store/useUser';
import { fetchNews } from '../../utils/useFetch';

const News = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery(['news', user?.language], () =>
    fetchNews(user?.language)
  );
  if (isLoading) {
    return <Box></Box>;
  }
  const sort = data.data.news.sort((a, b) => b.id - a.id);

  return (
    <Flex w="full" h="full" flexDirection="column" my="16" alignItems="center">
      {sort.map((news) => (
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
            <HStack my="5" bg="gray.200" overflow="hidden" h="64" w="96">
              <Box position="relative" zIndex={0} w="64" h="64">
                <Image boxSize="64" objectFit="cover" alt="" src={news.img} />
              </Box>
              <VStack h="56" justifyContent="space-around">
                <Box w="44">
                  <Text
                    px="3"
                    fontSize={15}
                    textAlign="center"
                    fontWeight={700}
                    color="gray.700"
                  >
                    {news.title}
                  </Text>
                </Box>
                <Box w="44">
                  <Text
                    px="2"
                    fontSize={12}
                    color="gray.700"
                    fontWeight={700}
                    style={{
                      direction: user?.language === 'ir' ? 'rtl' : 'ltr',
                    }}
                  >
                    {news.content.slice(0, 80)}...
                  </Text>
                </Box>
                <Box w="44">
                  <HStack w="44" justifyContent="space-between" px="2">
                    <Center>
                      <Image alt="" src="/image/audio.png" w="8" h="8" />
                      <Text ml="1">{news.voices.length}</Text>
                    </Center>
                    <Text fontWeight={700} fontSize={13}>
                      {news.source}
                    </Text>
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
