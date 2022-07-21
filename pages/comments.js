import { CloseIcon } from '@chakra-ui/icons';
import { Box, Center, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Loading from '../components/animation/Loading';
import useAud from '../utils/store/useAud';
import useUser from '../utils/store/useUser';
import { userComment } from '../utils/useFetch';

const Home = () => {
  const { user } = useUser();
  const { clearAud } = useAud();

  const { data, isLoading } = useQuery(['comments', user?.id], () =>
    userComment(user?.id)
  );
  if (isLoading) {
    return <Loading />;
  }

  const delVoice = async (id) => {
    const response = await fetch('https://talkbox.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Role': 'public',
      },
      body: JSON.stringify({
        query: `mutation MyMutation($id: Int) {
          delete_voice(where: {id: {_eq: $id}}) {
            returning {
              id
              like
            }
          }
        }
        
        
        `,
        variables: {
          id: parseInt(id),
        },
      }),
    });
    const data = await response.json();
    console.log(data);
    window.location.reload();
    return data;
  };

  return (
    <Box py="16">
      <Center display="flex" flexDirection="column" zIndex={100} w="full">
        {data.data.voice?.map((item) => (
          <Box
            zIndex={100}
            key={item.id}
            bg="rgba(186,0,191,0.7)"
            h="48"
            w="80"
            my="3"
            borderRadius="lg"
          >
            <Box
              onClick={() => delVoice(item.id)}
              position="absolute"
              right="14"
              pt="2"
              zIndex={100}
            >
              <CloseIcon zIndex={100} color="white" />
            </Box>
            <Center
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              mt="8"
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
