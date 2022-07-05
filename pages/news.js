import { SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from '../components/animation/Modal';
import NewsPage from '../components/base/NewsPAge';
import useStore from '../utils/store/useStore';

const Home = () => {
  const { setNews, news } = useStore();
  const router = useRouter();
  const [xx, setXx] = useState(true);
  const { query } = router;
  console.log(news);

  const handle = () => {
    setXx(false);
    if (news.map((id) => id.id).filter((id) => id === query.id).length === 0) {
      setNews({
        img: query.img,
        title: query.title,
        source: query.source,
        content: query.content,
      });
    }
  };

  return (
    <Box>
      <NewsPage
        img={query.img}
        title={query.title}
        source={query.source}
        content={query.content}
        url={query.url}
      />
      {xx && (
        <Button
          as={motion.button}
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          position="absolute"
          top="24"
          right="3"
          color="rgba(186,0,191)"
          onClick={handle}
          opacity={0.8}
          borderRadius={100}
          leftIcon={<SmallAddIcon w="8" h="8" color="rgba(186,0,191)" />}
        >
          save news
        </Button>
      )}
      <Modal newsid={query.id} title={query.title} />
    </Box>
  );
};

export default Home;
