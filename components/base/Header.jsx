import { Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';
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
  console.log(data);
  return (
    <Flex
      w="full"
      h="96"
      pt="12"
      overflowY="hidden"
      alignItems="center"
      flexWrap="nowrap"
      flexDirection="row-reverse"
      style={{ direction: 'rtl' }}
      sx={{
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Center>
        {data.data.jsonData[0].info.map((news, index) => (
          <Box key={index} display="flex">
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
                bg="#BA00BF"
                overflow="hidden"
                h="64"
                boxShadow="xl"
              >
                <Box position="relative" zIndex={0} w="44" h="36">
                  <Image alt="" src={news.urlToImage} w="44" h="36" />
                </Box>
                <Center style={{ direction: 'ltr' }} h="40" w="44">
                  <Text
                    p="2"
                    fontSize={12}
                    textAlign="center"
                    color="gray.50"
                    zIndex={100}
                    fontWeight={600}
                  >
                    {news.title.slice(0, 80)}...
                  </Text>
                </Center>
              </VStack>
            </Link>
          </Box>
        ))}
      </Center>
    </Flex>
  );
};

export default Header;
