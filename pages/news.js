import { SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../components/animation/Loading';
import Modal from '../components/animation/Modal';
import NewsPage from '../components/base/NewsPAge';
import useStore from '../utils/store/useStore';

const Home = () => {
  const { setNews, news } = useStore();
  const router = useRouter();
  const [xx, setXx] = useState(true);
  const [show, setShow] = useState(false);
  const { query } = router;
  console.log(news);

  useEffect(() => {
    if (news.find((id) => id.title === query.title)) {
      setXx(false);
    }
  }, [news]);
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
      {show ? (
        <Loading />
      ) : (
        <>
          <NewsPage
            img={query.img}
            title={query.title}
            source={query.source}
            content={query.content}
            url={query.url}
            onClickA={() => setShow(true)}
          />
          {xx ? (
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
          ) : (
            <Button
              as={motion.button}
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              position="absolute"
              top="24"
              right="3"
              color="rgba(186,0,191)"
              onClick={() => console.log('clicked')}
              opacity={0.8}
              borderRadius={100}
            >
              news saved
            </Button>
          )}
          <Modal newsid={query.id} title={query.title} />
        </>
      )}
    </Box>
  );
};

export default Home;
