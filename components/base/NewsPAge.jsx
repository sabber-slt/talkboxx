import { Box, Image, Text } from '@chakra-ui/react';

const NewsPage = ({ img, title, source, content }) => {
  return (
    <Box>
      <Image pt="16" alt="" w="full" h="80" src={img} />
      <Text fontSize={25} px="5" my="3" color="rgba(186,0,191,0.7)">
        {title}
      </Text>
      <Text fontSize={16} px="5" my="3" color="gray.600">
        {source}
      </Text>
      <Text
        whiteSpace="break-spaces"
        fontSize={16}
        px="5"
        my="3"
        color="gray.600"
      >
        {content}
      </Text>
    </Box>
  );
};

export default NewsPage;
