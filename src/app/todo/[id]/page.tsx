import { TodoType } from '@/types/types';
import { fetchTodoById } from '@/utils/supabase/actions';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default async function TodoDetail({
  params,
}: {
  params: { id: string };
}) {
  const todoId = params.id;
  const todo: TodoType[] = await fetchTodoById(todoId);
  return (
    <Box w='100%' mt='5'>
      <Heading
        fontSize='2xl'
        fontWeight='bold'
        p='3'
        w='100%'
        borderBottom='1px solid black'
      >
        {todo[0].title}
      </Heading>
      <Text fontSize='lg' w='100%' pt='4' pl='3'>
        {todo[0].detail}
      </Text>
      <Text fontSize='md' w='100%' pt='4' pl='3' textAlign='right'>
        期日: {todo[0].end_date.slice(0, 10)}
      </Text>
      <Box textAlign='center' mt='8'>
        <Button as={NextLink} href='/todo/' w='20%' colorScheme='teal'>
          戻る
        </Button>
      </Box>
    </Box>
  );
}
