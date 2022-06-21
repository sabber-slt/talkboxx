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
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import useUser from '../utils/store/useUser';
import { fetchCategory } from '../utils/useFetch';

const Home = () => {
  const { user } = useUser();
  const router = useRouter();
  const { query } = router;
  const { data, isLoading } = useQuery(
    ['category', user?.language, query.id],
    () => fetchCategory(user?.language, query.id)
  );
  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box py="16">
      <Box w="full" h="80" position="relative">
        <Image alt="" src={query.img} layout="fill" priority />
      </Box>

      <Flex w="full" h="full" flexDirection="column" alignItems="center">
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
              <HStack my="5" bg="gray.200" overflow="hidden" h="64" w="96">
                <Box position="relative" zIndex={0} w="64" h="64">
                  <Image boxSize="64" objectFit="cover" alt="" src={news.img} />
                </Box>
                <VStack h="56" justifyContent="space-around">
                  <Box w="44">
                    <Text
                      px="3"
                      fontWeight="bold"
                      fontSize={15}
                      textAlign="center"
                      color="gray.700"
                    >
                      {news.title}
                    </Text>
                  </Box>
                  <Box w="44">
                    <Text
                      px="2"
                      fontSize={12}
                      textAlign="center"
                      color="gray.700"
                      fontWeight="bold"
                    >
                      {news.content.slice(0, 100)}...
                    </Text>
                  </Box>
                  <Box w="44">
                    <HStack w="44" justifyContent="space-between" px="2">
                      <Center>
                        <Image alt="" src="/image/audio.png" w="8" h="8" />
                        <Text ml="1">{news.voices.length}</Text>
                      </Center>
                      <Text fontWeight="bold" fontSize={13}>
                        {' '}
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
    </Box>
  );
};

export default Home;
