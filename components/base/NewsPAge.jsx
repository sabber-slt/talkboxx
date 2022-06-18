import { Box, Image, Text } from '@chakra-ui/react';
import useUser from '../../utils/store/useUser';

const NewsPage = ({ img, title, source, content }) => {
  const { user } = useUser();
  return (
    <Box>
      <Image pt="16" alt="" w="full" h="80" src={img} />
      <Text
        style={{ direction: user?.language === 'ir' ? 'rtl' : 'ltr' }}
        fontSize={25}
        px="5"
        my="3"
        color="rgba(186,0,191,0.7)"
      >
        {title}
      </Text>
      <Text
        style={{ direction: user?.language === 'ir' ? 'rtl' : 'ltr' }}
        fontSize={16}
        px="5"
        my="3"
        color="gray.600"
      >
        {source}
      </Text>
      <Text
        style={{ direction: user?.language === 'ir' ? 'rtl' : 'ltr' }}
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
