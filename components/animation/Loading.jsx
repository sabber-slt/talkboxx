import { Box, Center, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Box w="full" h="100vh" position="absolute">
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.500"
          size="xl"
        />
      </Center>
    </Box>
  );
};

export default Loading;
