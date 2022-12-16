/* eslint-disable react/no-children-prop */
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useUser from '../utils/store/useUser';

export default function Home() {
  const router = useRouter();

  const [err, setErr] = useState('');
  const { setUser, user } = useUser();
  console.log(user);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    const { username } = values;
    const res = await fetch('https://talkbox.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Role': 'public',
      },
      body: JSON.stringify({
        query: `query MyQuery( $email:String) {
          user(where: {email: {_eq: $email}}) {
            email
            img
            language
            id
            password
            username
          }
        }
        `,
        variables: {
          email: username,
        },
      }),
    });
    const data = await res.json();
    if (data.data.user.length !== 0) {
      setUser(data.data.user[0]);
      router.push('/');
    } else {
      setErr('Username or password is incorrect');
    }
    console.log(data);
  }

  return (
    <Box
      w="100%"
      h="100vh"
      overflow="hidden"
      position="relative"
      bg="purple.800"
    >
      <AspectRatio
        position="absolute"
        w="full"
        objectFit="cover"
        maxH={['100vh', '2xl']}
        zIndex={0}
        opacity={0.7}
        ratio={[1 / 4, 1, 1, 1]}
      >
        <video autoPlay loop muted playsInline>
          <source
            src="https://res.cloudinary.com/dupfwlkgb/video/upload/v1655379143/video_4_qwios3.mp4"
            type="video/mp4"
          />
        </video>
      </AspectRatio>
      <Box
        zIndex={100}
        h="full"
        w="full"
        display="flex "
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Center
          bg="rgba(240, 240, 240,0.8)"
          borderRadius={10}
          p="10"
          zIndex={100}
          display="flex"
          flexDirection="column"
        >
          <Text color="rgba(186,0,191,0.7)">{err}</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="username" mt="5">
              username
            </FormLabel>
            <Input
              width="auto"
              spacing={3}
              color="gray.600"
              borderColor="rgba(186,0,191,0.7)"
              type="text"
              {...register('username', { required: true })}
            />

            <Center>
              <VStack>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="gray"
                  variant="outline"
                  mt="5"
                  w="48"
                  borderColor="rgba(186,0,191,0.9)"
                >
                  Submit
                </Button>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  borderColor="rgba(186,0,191,0.9)"
                  mt="8"
                  w="48"
                  onClick={() => router.push('/register')}
                >
                  do not have an account?
                </Button>
              </VStack>
            </Center>
          </form>
        </Center>
      </Box>
    </Box>
  );
}
