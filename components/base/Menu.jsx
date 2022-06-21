import { Box, Center, Grid, Image, Text, VStack } from '@chakra-ui/react';
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
    <Center my="7">
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {data.data.default[0].info.map((item) => (
          <Box key={item.id} h="24" w="24" bg="gray.200" borderRadius={10}>
            <Link
              href={{
                pathname: '/category',
                query: {
                  id: item.slug,
                  img: item.cover,
                },
              }}
              passhref="true"
            >
              <a>
                <Center h="24">
                  <VStack>
                    <Image alt="" w="10" h="10" src={item.img} />
                    <Text fontWeight={600} color="rgba(186,0,191)">
                      {item.title}
                    </Text>
                  </VStack>
                </Center>
              </a>
            </Link>
          </Box>
        ))}
      </Grid>
    </Center>
  );
};

export default Menu;
