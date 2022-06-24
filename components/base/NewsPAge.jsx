import { Box, Image, Text } from '@chakra-ui/react';
import useUser from '../../utils/store/useUser';

const NewsPage = ({ img, title, source, content }) => {
  const { user } = useUser();
  return (
    <Box py="12">
      <Image alt="" w="full" h="80" src={img} />
      <Text
        style={{ direction: user?.language === 'ir' ? 'rtl' : 'ltr' }}
        fontSize={25}
        px="5"
        my="3"
        color="#BA00BF"
        fontWeight="bold"
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
        fontWeight="bold"
        px="5"
        py="5"
        color="gray.600"
      >
        {content.replace(/<[^>]+>/g, '')}
      </Text>
    </Box>
  );
};

export default NewsPage;
