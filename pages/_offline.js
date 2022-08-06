import { AspectRatio } from '@chakra-ui/react';

const Home = () => {
  return (
    <AspectRatio
      position="absolute"
      w="full"
      objectFit="cover"
      maxH={['100vh', '100vh']}
      zIndex={0}
      opacity={0.7}
      ratio={[1 / 4, 1, 1, 1]}
    >
      <video autoPlay loop muted playsInline>
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </AspectRatio>
  );
};

export default Home;
