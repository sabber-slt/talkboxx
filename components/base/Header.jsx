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
        {data.data.jsonData[0]?.info
          .sort((a, b) => 0.5 - Math.random())
          .map((news, index) => (
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
                      {language !== 'ir'
                        ? news.source.name
                        : news.categories[0]}
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
