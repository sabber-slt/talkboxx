/* eslint-disable no-undef */
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Image, VStack } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useUser from '../utils/store/useUser';

const Home = () => {
  const router = useRouter();
  const { user, clearUser, setUser } = useUser();
  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);
  const [postImage, setPostImage] = useState('');
  const [loading, setLoading] = useState(false);

  const url = 'https://talkbox.hasura.app/v1/graphql';
  const createImage = (newImage) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hasura-Role': 'public',
      },
      body: JSON.stringify({
        query: `
      mutation MyMutation($id:Int!,$img:String) {
        update_user_by_pk(pk_columns: {id: $id}, _set: {img: $img}) {
          email
          id
          img
          language
          password
          username
        }
      }
      
      `,
        variables: {
          id: user.id,
          img: newImage,
        },
      }),
    }).then((res) => res.json());

  const createPost = async (post) => {
    if (postImage !== '') {
      setLoading(true);
      try {
        const upload = await createImage(post);
        setUser(upload.data.update_user_by_pk);
        console.log(upload);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage(base64);
  };

  return (
    <Box pt="16" h="full">
      <Center flexDirection="column" h="80" bg="#BA00BF">
        <Image alt="" src={user?.img || ''} borderRadius={15} w={150} h={150} />
        <form onSubmit={handleSubmit}>
          <VStack mt="4">
            <Center w="24">
              <input
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleFileUpload(e)}
              />
            </Center>
            {postImage !== '' && (
              <Button type="submit" colorScheme="purple">
                {loading ? 'Loading...' : 'Upload'}
              </Button>
            )}
          </VStack>
        </form>
      </Center>
      <Center h="full">
        <VStack>
          <Button
            size="lg"
            height="20"
            width="80"
            border="2px"
            bg="whiteAlpha.100"
            borderColor="purple.700"
            color="purple.700"
            my="3"
            onClick={() => {
              clearUser();

              window.location.reload();
            }}
            leftIcon={<ExternalLinkIcon w="7" h="7" />}
          >
            logout
          </Button>
          <Button
            size="lg"
            height="20"
            width="80"
            border="2px"
            bg="whiteAlpha.100"
            borderColor="purple.700"
            color="purple.700"
            my="3"
            onClick={() => {
              router.push('/comments');
            }}
            leftIcon={<ExternalLinkIcon w="7" h="7" />}
          >
            your voice
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default Home;
