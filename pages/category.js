import { Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import useUser from '../utils/store/useUser';
import { fetchEnCat, fetchFrCat, fetchIrCat } from '../utils/useFetch';

const Home = () => {
  const { user } = useUser();
  const router = useRouter();
  const { query } = router;
  const search =
    user?.language === 'en'
      ? fetchEnCat(query.id)
      : user?.language === 'ir'
      ? fetchIrCat(query.id)
      : fetchFrCat(query.id);
  const { data, isLoading } = useQuery(['category', query.id], () => search);
  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  console.log(data);
  const arr =
    user?.language === 'ir'
      ? data?.data?.faJson
      : user?.language === 'en'
      ? data?.data?.enJson
      : data?.data?.frJson;

  return (
    <Box py="16">
      <Box w="full" h="80" position="relative">
        <Image alt="" src={query.img} w="full" h="80" />
      </Box>

      <Flex w="full" h="full" flexDirection="column" alignItems="center">
        <Box>
          {arr?.map((item) => (
            <Box key={item.id}>
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
      </Flex>
    </Box>
  );
};

export default Home;
