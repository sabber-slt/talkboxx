/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Center,
  FormLabel,
  Input,
  Text,
  Textarea,
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
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    const { name, text } = values;
    const res = await fetch('https://talkbox.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Role': 'public',
      },
      body: JSON.stringify({
        query: `mutation MyMutation($name:String,$text:String) {
          insert_contact(objects: {name: $name, text: $text}) {
            returning {
              id
              name
            }
          }
        }
        `,
        variables: {
          name,
          text,
        },
      }),
    });
    const data = await res.json();
    if (data.data) {
      router.push('/profile');
    } else {
      setErr('Username or password is incorrect');
    }
    console.log(data);
  }

  return (
    <Box w="100%" h="100vh" overflow="hidden" position="relative" bg="#BA00BF">
      <Box
        zIndex={100}
        h="full"
        w="full"
        display="flex "
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="white" fontWeight="bold">
          talkboxteam@gmail.com{' '}
        </Text>
        <Text color="white" fontWeight="bold" pb="3">
          www.talkbox.online
        </Text>
        <Center
          bg="rgba(240, 240, 240,0.9)"
          borderRadius={10}
          p="10"
          zIndex={100}
          display="flex"
          flexDirection="column"
        >
          <Text color="rgba(186,0,191,0.7)">{err}</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="username" mt="5">
              name
            </FormLabel>
            <Input
              width="auto"
              spacing={3}
              color="gray.600"
              borderColor="rgba(186,0,191,0.7)"
              type="text"
              {...register('name', { required: true })}
            />
            <FormLabel htmlFor="email" mt="5">
              text
            </FormLabel>
            <Textarea
              placeholder=""
              spacing={3}
              color="gray.600"
              borderColor="rgba(186,0,191,0.7)"
              {...register('text', { required: true })}
            />

            <Center>
              <VStack>
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="rgba(186,0,191,0.7)"
                  variant="outline"
                  mt="5"
                >
                  Submit
                </Button>
              </VStack>
            </Center>
          </form>
        </Center>
      </Box>
    </Box>
  );
}
