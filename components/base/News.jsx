import { Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';

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
  console.log(data);
  // console.log(data.data.jsonData[0].info.sort((a, b) => 0.5 - Math.random()));

  return (
    <Flex w="full" h="full" flexDirection="column" my="16" alignItems="center">
      <Box>
        {data.data.jsonData
          .sort((a, b) => 0.5 - Math.random())
          .map((news, index) => (
            <Box key={index}>
              {news.info
                .sort((a, b) => 0.5 - Math.random())
                .map((item, index1) => (
                  <Box key={index1}>
                    <Link
                      href={{
                        pathname: '/news',
                        query: {
                          id: item.title,
                          img:
                            user?.language !== 'ir'
                              ? item.urlToImage
                              : item.thumbnail,
                          title: item.title,
                          content: item.description,
                          source:
                            user?.language !== 'ir'
                              ? item.source.name
                              : item.categories[0],
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
                                ? item.urlToImage
                                : item.thumbnail
                            }
                          />
                        </Box>
                        <VStack
                          bg="rgba(186,0,191,0.6)"
                          position="absolute"
                          zIndex={100}
                          w="96"
                          h={item.title.length > 80 ? '32' : '24'}
                        >
                          <Center h={item.title.length > 80 ? '32' : '24'}>
                            <Text
                              px="5"
                              pt="1"
                              fontSize={user?.language !== 'ir' ? 16 : 18}
                              textAlign="center"
                              fontWeight={700}
                              color="gray.50"
                            >
                              {item.title}
                            </Text>
                          </Center>
                          <Text
                            p="2"
                            fontSize={user?.language !== 'ir' ? 11 : 14}
                            textAlign="center"
                            fontWeight={700}
                            color="gray.50"
                          >
                            {user?.language !== 'ir'
                              ? item.source.name
                              : item.categories[0]}
                          </Text>
                        </VStack>
                      </VStack>
                    </Link>
                  </Box>
                ))}
            </Box>
          ))}
      </Box>
    </Flex>
  );
};

export default News;
