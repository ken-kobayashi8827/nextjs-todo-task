import { Button, Flex, Heading } from '@chakra-ui/react';

export default function Header() {
  return (
    <Flex
      as='header'
      bg='blackAlpha.400'
      justifyContent='space-between'
      alignItems='center'
      p='3'
      mb='2'
    >
      <Heading size='lg' color='white'>
        【課題】Nextjs Todoリスト
      </Heading>
      <Button colorScheme='red'>ログアウト</Button>
    </Flex>
  );
}
