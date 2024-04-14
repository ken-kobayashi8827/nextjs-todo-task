import { Flex, Heading, Link } from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex direction='column' align='center' justify='center' minH='100vh' p={5}>
      <Heading as='h1' size='2xl' mb={6}>
        Welcome to My TODO App
      </Heading>
      <Link href='/auth/login' color='blue.500' fontSize='xl'>
        Login
      </Link>
    </Flex>
  );
}
