/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../components/base/Header';
import Menu from '../components/base/Menu';
import News from '../components/base/News';
import useUser from '../utils/store/useUser';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    if (user === null) {
      router.push('/register');
    }
  }, [user]);
  return (
    <Box>
      <Header language={user ? user.language : 'en'} />
      <Menu />
      <News />
    </Box>
  );
}
