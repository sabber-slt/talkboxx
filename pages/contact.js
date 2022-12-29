/* eslint-disable react/no-children-prop */
import { Box, Text } from '@chakra-ui/react';
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
      </Box>
    </Box>
  );
}
