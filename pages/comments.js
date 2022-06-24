import { Box, Center, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Loading from '../components/animation/Loading';
import useUser from '../utils/store/useUser';
import { userComment } from '../utils/useFetch';

const Home = () => {
  const { user } = useUser();

  const { data, isLoading } = useQuery(['comments', user?.id], () =>
    userComment(user?.id)
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box py="16">
      <Center display="flex" flexDirection="column" zIndex={100} w="full">
        {data.data.voice?.map((item) => (
          <Box
            zIndex={100}
            key={item.id}
            bg="rgba(186,0,191,0.7)"
            h="40"
            w="80"
            my="3"
            borderRadius="lg"
          >
            <Center
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              mt="5"
              h="36"
              zIndex={100}
            >
              <Text
                zIndex={100}
                fontSize="xs"
                fontWeight="bold"
                px="3"
                color="white"
                textAlign="center"
              >
                {item.newsString}
              </Text>
              <audio controls style={{ width: 170 }}>
                <source src={item.voice} type="audio/mpeg" />
              </audio>
            </Center>
          </Box>
        ))}
      </Center>
    </Box>
  );
};

export default Home;
