import { Box, Center, Flex, Grid, Image, Text, VStack } from '@chakra-ui/react';
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

  const slice = arr?.slice(16, 20);

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
      {/* <Center w="full"> */}
      <Grid
        ml={['5', '10vw']}
        templateColumns={['repeat(4,  1fr)', 'repeat(4,  1fr)']}
        gap={4}
      >
        {/* <Center> */}
        {slice?.map((news, index) => (
          <Box key={index} display="flex">
            <Link
              href={{
                pathname: '/news',
                query: {
                  id: news.title,
                  img: language !== 'ir' ? news.urlToImage : news.thumbnail,
                  title: news.title,
                  content: news.description,
                  url: news.url ? news.url : '',
                  source:
                    language !== 'ir' ? news.source.name : news.categories[0],
                },
              }}
              passhref="true"
            >
              <VStack
                justifyContent="flex-end"
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
                    {language !== 'ir' ? news.source : news.categories[0]}
                  </Text>
                </VStack>
              </VStack>
            </Link>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
};

export default Header;
