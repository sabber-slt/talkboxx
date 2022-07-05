import { Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import useUser from '../../utils/store/useUser';
import { fetchMenu } from '../../utils/useFetch';

const Menu = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery(['menu', user?.language], () =>
    fetchMenu(user?.language)
  );
  if (isLoading) {
    return <Box></Box>;
  }

  return (
    <Flex
      display={['flex', 'none']}
      w="full"
      h="44"
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
        {data?.data?.default[0].info.map((news) => (
          <Box key={news.id} display="flex">
            <Link
              href={{
                pathname: '/category',
                query: {
                  id: news.slug,
                  img: news.cover,
                },
              }}
              passhref="true"
            >
              <VStack
                mx="3"
                bg="#BA00BF"
                overflow="hidden"
                h="28"
                w="24"
                boxShadow="lg"
                borderRadius={15}
              >
                <Center w="24" h="40">
                  <Image alt="" src={news.img} w="12" h="12" />
                </Center>
                <Center>
                  <Text
                    p="2"
                    fontSize={14}
                    textAlign="center"
                    color="gray.50"
                    zIndex={100}
                    fontWeight={600}
                  >
                    {news.title}
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

export default Menu;
