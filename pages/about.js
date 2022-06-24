import { Box, Center, Image, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box>
      <Image
        alt=""
        style={{ filter: 'grayscale(100%)' }}
        w="full"
        src="https://res.cloudinary.com/dupfwlkgb/image/upload/v1656054313/pexels-skitterphoto-675960_kooj20.jpg"
        h="100vh"
        position="fixed"
        top="0"
        zIndex={-1}
      />
      <Center h="100vh" bg="rgba(186,0,191,0.5)">
        <Text fontSize="xl" fontWeight="bold" px="3" color="white">
          The audience of the news agency’s websites is interested in commenting
          on the news and seeing it. On the other hand, they like to hear
          people’s opinions about some news. As it turned out, today the
          transmission of ideas has taken on a new form and audiences
          increasingly like to interact with each other by voice rather than
          text interaction (like clubhouse). Hence, the TalkBox has been
          created. In TalkBox you can voice comment on the news and hear the
          opinions of other audiences.
        </Text>
      </Center>
    </Box>
  );
};

export default Home;
