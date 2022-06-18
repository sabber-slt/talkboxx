import { Box, Center, Flex, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { fetchPublic } from '../../utils/useFetch';
import Loading from '../animation/Loading';

const Header = ({ language }) => {
  const { data, isLoading } = useQuery(['header', language], () =>
    fetchPublic(language)
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex
      w="full"
      h="96"
      pt="12"
      overflowY="hidden"
      alignItems="center"
      flexWrap="nowrap"
      sx={{
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Center>
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
              <VStack
                mx="3"
                bg="rgba(186,0,191,0.7)"
                borderRadius={20}
                overflow="hidden"
                h="64"
                boxShadow="xl"
              >
                <Box position="relative" zIndex={0} w="44" h="44">
                  <Image alt="" src={news.img} layout="fill" />
                </Box>
                <Box h="28" w="44">
                  <Text
                    p="2"
                    fontSize={14}
                    textAlign="center"
                    color="gray.50"
                    zIndex={100}
                  >
                    {news.title}
                  </Text>
                </Box>
              </VStack>
            </Link>
          </Box>
        ))}
      </Center>
    </Flex>
  );
};

export default Header;
