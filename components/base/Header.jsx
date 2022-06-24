import { Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

import { useQuery } from 'react-query';
import { fetchEn, fetchFr, fetchIr } from '../../utils/useFetch';

const Header = ({ language }) => {
  const search =
    language === 'en' ? fetchEn() : language === 'ir' ? fetchIr() : fetchFr();
  const { data, isLoading } = useQuery('news', () => search);

  if (isLoading) {
    return <Box></Box>;
  }
  const arr =
    language === 'ir'
      ? data?.data?.faJson
      : language === 'en'
      ? data?.data?.enJson
      : data?.data?.frJson;

  const slice = arr.slice(0, 5);

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
        {slice.map((news, index) => (
          <Box key={index} display="flex">
            <Link
              href={{
                pathname: '/news',
                query: {
                  id: news.title,
                  img: language !== 'ir' ? news.urlToImage : news.thumbnail,
                  title: news.title,
                  content: news.description,
                  source:
                    language !== 'ir' ? news.source.name : news.categories[0],
                },
              }}
              passhref="true"
            >
              <VStack
                justifyContent="flex-end"
                m="3"
                borderRadius="lg"
                bg="gray.200"
                overflow="hidden"
                h="72"
                w="72"
              >
                <Box position="relative" w="72" h="72">
                  <Image
                    position="absolute"
                    w="72"
                    h="72"
                    objectFit="cover"
                    zIndex={0}
                    alt=""
                    src={language !== 'ir' ? news.urlToImage : news.thumbnail}
                  />
                </Box>
                <VStack zIndex={100} bg="rgba(186,0,191,0.6)" w="72" h="28">
                  <Center h="36">
                    <Text
                      p="2"
                      fontSize={14}
                      textAlign="center"
                      fontWeight={700}
                      color="gray.50"
                    >
                      {news.title}
                    </Text>
                  </Center>
                  <Text
                    pb="2"
                    fontSize={12}
                    textAlign="center"
                    fontWeight={600}
                    color="gray.50"
                  >
                    {language !== 'ir' ? news.source.name : news.categories[0]}
                  </Text>
                </VStack>
              </VStack>
            </Link>
          </Box>
        ))}
      </Center>
    </Flex>
  );
};

export default Header;
