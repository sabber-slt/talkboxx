import { Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';
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
        <Image alt="" src={query.img} w="full" h="80" />
      </Box>

      <Flex w="full" h="full" flexDirection="column" alignItems="center">
        <Box>
          {data.data.jsonData[0]?.info.map((news, index) => (
            <Box key={index}>
              <Link
                href={{
                  pathname: '/news',
                  query: {
                    id: news.title,
                    img: news.urlToImage,
                    title: news.title,
                    content: news.content,
                    source:
                      user?.language !== 'ir'
                        ? news.source.name
                        : news.categories[0],
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
                    <Image
                      // boxSize="72"
                      w="96"
                      h="72"
                      objectFit="cover"
                      // objectPosition="center"
                      alt=""
                      src={
                        user?.language !== 'ir'
                          ? news.urlToImage
                          : news.thumbnail
                      }
                    />
                  </Box>
                  <VStack
                    bg="rgba(186,0,191,0.6)"
                    position="absolute"
                    zIndex={100}
                    w="96"
                    h="28"
                  >
                    <Center h="28">
                      <Text
                        px="5"
                        fontSize={14}
                        textAlign="center"
                        fontWeight={700}
                        color="gray.50"
                      >
                        {news.title}
                      </Text>
                    </Center>
                    <Text
                      px="5"
                      fontSize={11}
                      textAlign="center"
                      fontWeight={700}
                      color="gray.50"
                    >
                      {user?.language !== 'ir'
                        ? news.source.name
                        : news.categories[0]}
                    </Text>
                  </VStack>
                </VStack>
              </Link>
            </Box>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
