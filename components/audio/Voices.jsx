import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Center, Image, Text, VStack } from '@chakra-ui/react';

import { useQuery } from 'react-query';
// import useUser from '../../utils/store/useUser';
import { fetchComments } from '../../utils/useFetch';
import { update_like } from '../../utils/useMution';

const Voices = ({ newsid }) => {
  // const { user } = useUser();

  const { data, isLoading } = useQuery(['news', newsid], () =>
    fetchComments(newsid)
  );
  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const comments = data?.data.voice.sort((a, b) => b.like - a.like);
  const upVote = (likeb, id) => {
    console.log(likeb, id);
    const like = likeb + 1;
    update_like(id, like);
  };

  const downVote = (likeb, id) => {
    console.log(likeb, id);
    const like = likeb - 1;
    update_like(id, like);
  };

  return (
    <Box>
      {comments.map((item, index) => (
        <Center
          bg="rgba(186,0,191,0.1)"
          my="5"
          h="full"
          borderRadius={10}
          w="full"
          justifyContent="space-between"
          shadow="lg"
          key={index}
        >
          <Box w="32" py="2">
            <Center h="full">
              <Image
                alt=""
                src={item.users[0]?.img}
                boxSize="70px"
                borderRadius={100}
                objectFit="inherit"
                shadow="lg"
              />
            </Center>
            <Center>
              <Text p="2" color="rgba(186,0,191)">
                {item.users[0]?.username}
              </Text>
            </Center>
          </Box>
          <Center w="64" id="mainActionContainer">
            <audio controls style={{ width: 170 }}>
              <source src={item.voice} type="audio/mpeg" />
            </audio>
          </Center>

          <Center mr="3">
            <VStack>
              <Box onClick={() => upVote(item.like, item.id)} h="6">
                <ChevronUpIcon color="rgba(186,0,191)" w="5" h="5" />
              </Box>
              <Text color="gray.600">{item.like}</Text>
              <Box onClick={() => downVote(item.like, item.id)} h="6">
                <ChevronDownIcon w="5" color="rgba(186,0,191)" h="5" />
              </Box>
            </VStack>
          </Center>
        </Center>
      ))}
    </Box>
  );
};

export default Voices;
