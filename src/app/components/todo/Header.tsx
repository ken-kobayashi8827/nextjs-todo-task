'use client';

import { logout } from '@/utils/supabase/actions';
import { Button, Flex, Heading, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Header() {
  const handleLogout = async () => {
    await logout();
  };

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
      <HStack>
        <Button as={NextLink} href='/todo/create' colorScheme='blue'>
          TODO作成
        </Button>
        <Button colorScheme='red' onClick={handleLogout}>
          ログアウト
        </Button>
      </HStack>
    </Flex>
  );
}
