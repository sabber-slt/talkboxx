/* eslint-disable react/no-children-prop */
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
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
  const { setUser } = useUser();

  const { handleSubmit, register } = useForm();

  async function onSubmit(values) {
    const { username, password, email, language } = values;
    const res = await fetch('https://talkbox.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Role': 'public',
      },
      body: JSON.stringify({
        query: `mutation MyMutation($username:String,$password:String,$email:String,$language:String) {
          insert_user_one(object: {username:$username, password: $password, email: $email,language:$language}) {
            email
            img
            password
            username
            language
            id
          }
        }
        `,
        variables: {
          username,
          password,
          email,
          language,
        },
      }),
    });
    const data = await res.json();
    if (data.data.insert_user_one) {
      console.log(data);
      setUser(data.data.insert_user_one);
      router.push('/');
    } else {
      setErr('please change your username');
    }
    console.log(language);
  }

  return (
    <Box w="100%" h={['100vh', '2xl']} position="relative" bg="green.800">
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
            <FormLabel htmlFor="email" mt="5">
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
            <FormLabel htmlFor="email" mt="5">
              password
            </FormLabel>
            <Input
              width="auto"
              spacing={3}
              color="gray.600"
              borderColor="rgba(186,0,191,0.7)"
              type="password"
              {...register('password', { required: true })}
            />
            <FormLabel htmlFor="email" mt="5">
              email
            </FormLabel>
            <Input
              width="auto"
              spacing={3}
              color="gray.600"
              borderColor="rgba(186,0,191,0.7)"
              type="email"
              {...register('email', { required: true })}
            />
            <FormLabel htmlFor="language" mt="5">
              language:
            </FormLabel>
            <RadioGroup defaultValue="1">
              <Stack
                spacing={4}
                direction="row"
                {...register('language', { required: true })}
              >
                <Radio {...register('language')} value="en">
                  English
                </Radio>
                <Radio {...register('language')} value="sp">
                  Spanish
                </Radio>
                <Radio {...register('language')} value="ir">
                  Persian
                </Radio>
              </Stack>
            </RadioGroup>

            <Center>
              <VStack>
                <Button
                  type="submit"
                  colorScheme="gray"
                  variant="outline"
                  mt="5"
                >
                  Submit
                </Button>
                <Button
                  type="submit"
                  colorScheme="gray"
                  variant="outline"
                  mt="8"
                  onClick={() => router.push('/login')}
                >
                  have an account?
                </Button>
              </VStack>
            </Center>
          </form>
        </Center>
      </Box>
    </Box>
  );
}
