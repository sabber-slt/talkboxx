import { Box, Center, Flex, Grid, Image, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useQuery } from 'react-query';
import useUser from '../../utils/store/useUser';
import { fetchEn, fetchFr, fetchIr } from '../../utils/useFetch';
import ErrorLoading from '../animation/ErrorLoading';
import Loading from '../animation/Loading';

const News = () => {
  const { user } = useUser();
  const search =
    user?.language === 'en'
      ? fetchEn()
      : user?.language === 'ir'
      ? fetchIr()
      : fetchFr();

  const { data, isLoading, isError } = useQuery('news', () => search);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorLoading />;
  }

  console.log(data);

  const arr =
    user?.language === 'ir'
      ? data?.data?.faJson
      : user?.language === 'en'
      ? data?.data?.enJson
      : data?.data?.frJson;

  // console.log(data.data.jsonData[0].info.sort((a, b) => 0.5 - Math.random()));

  return (
    <Flex
      w="full"
      h="full"
      flexDirection="column"
      mt="5"
      mb="16"
      alignItems="center"
    >
      <Grid templateColumns={['repeat(1,  1fr)', 'repeat(3,  1fr)']} gap={4}>
        {arr?.map((item) => (
          <Box
            key={item.id}
            as={motion.div}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition="0.7s linear "
          >
            <Link
              href={{
                pathname: '/news',
                query: {
                  id: item.title,
                  img:
                    user?.language !== 'ir' ? item.urlToImage : item.thumbnail,
                  title: item.title,
                  url: item.url ? item.url : '',
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
                      user?.language !== 'ir' ? item.urlToImage : item.thumbnail
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
                      fontSize={user?.language !== 'ir' ? 15 : 18}
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
                    {user?.language !== 'ir' ? item.source : item.categories[0]}
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

export default News;
