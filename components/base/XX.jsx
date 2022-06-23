import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import useUser from '../../utils/store/useUser';

const XX = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery('xx', async () => {
    const res = await fetch(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=3a6296cd34904f509abe2a38e0b90fb9'
    );
    return res.json();
  });
  if (isLoading) {
    return <Box></Box>;
  }
  console.log(data);

  // const sort = data.data.news.sort((a, b) => b.id - a.id);

  return (
    <Flex
      w="full"
      h="full"
      flexDirection="column"
      my="16"
      alignItems="center"
    ></Flex>
  );
};

export default XX;
