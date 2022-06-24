/* eslint-disable react/no-children-prop */
import { Search2Icon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Search = () => {
  const router = useRouter();

  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);
  const handleClick = async () => {
    router.push({
      pathname: '/search',
      query: {
        id: value,
      },
    });
  };
  return (
    <Center mt="6">
      <Stack spacing={4}>
        <InputGroup size="md" w="80">
          <Input
            w="80"
            h="10"
            value={value}
            borderRadius="md"
            placeholder="Search news"
            borderColor="rgba(186,0,191)"
            onChange={handleChange}
          />
          <InputRightElement>
            <Button
              h="8"
              w="8"
              mr="1"
              borderColor="rgba(186,0,191)"
              onClick={handleClick}
            >
              <Search2Icon boxSize="5" />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Stack>
    </Center>
  );
};

export default Search;
//.map((item) => item)
