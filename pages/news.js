import { SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';
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
          position="fixed"
          top="24"
          right="10"
          w="14"
          h="14"
          onClick={handle}
          borderRadius={100}
        >
          <SmallAddIcon w="8" h="8" color="rgba(186,0,191)" />
        </Button>
      )}
      <Modal newsid={query.id} title={query.title} />
    </Box>
  );
};

export default Home;
