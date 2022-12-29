/* eslint-disable react/no-children-prop */
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
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

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    const { username, language } = values;
    console.log(username);
    const res = await fetch('https://talkbox.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Role': 'public',
      },
      body: JSON.stringify({
        query: `mutation MyMutation($username:String,$email:String,$language:String) {
          insert_user_one(object: {username:$username,  email: $email,language:$language}) {
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
          email: username,
          username: '',
          language,
        },
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.data) {
      console.log(data);
      setUser(data.data.insert_user_one);
      router.push('/');
    } else {
      setErr('please change your username');
    }
    console.log(language);
  }

  return (
    <Box
      w="100%"
      h="100vh"
      overflowY="hidden"
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
            <FormControl isInvalid={errors.name}>
              <FormLabel fontWeight="bold" htmlFor="username" mt="5">
                your name:
              </FormLabel>
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
              <Input
                width="auto"
                spacing={3}
                color="gray.600"
                borderColor="rgba(186,0,191,0.7)"
                type="text"
                {...register('username', {
                  required: true,
                })}
              />
            </FormControl>

            <FormLabel fontWeight="bold" htmlFor="language" mt="5">
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
                <Radio {...register('language')} value="fr">
                  France
                </Radio>
                <Radio {...register('language')} value="ar">
                  Arabic
                </Radio>
              </Stack>
            </RadioGroup>

            <Center>
              <VStack>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="gray"
                  variant="outline"
                  mt="5"
                  w="40"
                  borderColor="rgba(186,0,191,0.9)"
                >
                  Enter
                </Button>
              </VStack>
            </Center>
          </form>
        </Center>
      </Box>
    </Box>
  );
}
