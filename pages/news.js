import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Modal from '../components/animation/Modal';
import NewsPage from '../components/base/NewsPAge';

const Home = () => {
  const router = useRouter();
  const { query } = router;
  console.log(query);
  return (
    <Box>
      <NewsPage
        img={query.img}
        title={query.title}
        source={query.source}
        content={query.content}
      />
      <Modal newsid={query.id} title={query.title} />
    </Box>
  );
};

export default Home;
