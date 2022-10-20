import { Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import useUser from '../utils/store/useUser';
import { enSearch, faSearch, frSearch } from '../utils/useMution';

const Home = () => {
  const router = useRouter();
  const { query } = router;
  const { user } = useUser();
  const se =
    user?.language === 'ir'
      ? faSearch(query.id)
      : user?.language === 'en'
      ? enSearch(query.id)
      : frSearch(query.id);
  const { data, isLoading } = useQuery('search', () => se);
  if (isLoading) {
    return <Box></Box>;
  }
  console.log(data);
  const arr =
    user?.language === 'ir'
      ? data?.data?.faJson
      : user?.language === 'en'
      ? data?.data?.enJsons
      : data?.data?.frJson;

  return (
    <Flex w="full" h="full" flexDirection="column" py="16" alignItems="center">
      <Box>
        {arr.map((item) => (
          <Box key={item.id}>
            <Link
              href={{
                pathname: '/news',
                query: {
                  id: item.title,
                  img:
                    user?.language !== 'ir' ? item.urlToImage : item.thumbnail,
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
    </Flex>
  );
};

export default Home;
