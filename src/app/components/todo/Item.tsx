import { TodoType } from '@/types/types';
import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import DeleteButton from './button/DeleteButton';
import StatusSelect from './select/StatusSelect';

type PropsType = {
  todo: TodoType;
};

export default function Item({ todo }: PropsType) {
  return (
    <Box
      w='100%'
      pb='3'
      pl='4'
      pr='3'
      mb='3'
      mt='2'
      borderBottom='1px solid black'
    >
      <HStack>
        <Heading
          as={NextLink}
          href={`todo/${todo.id}`}
          fontSize='2xl'
          fontWeight='bold'
          w='100%'
          _hover={{ opacity: '0.8', transition: 'opacity 0.3s ease-in-out' }}
        >
          {todo.title}
        </Heading>
        <Text fontSize='lg' w='100%' textAlign='right' mr='3'>
          終了日時: {todo.end_date.slice(0, 10)}
        </Text>
        <StatusSelect todoId={todo.id} todoStatus={todo.status} />
        <DeleteButton todoId={todo.id} />
        <Button
          as={NextLink}
          href={`todo/${todo.id}/edit`}
          w='15%'
          colorScheme='blue'
        >
          編集
        </Button>
      </HStack>
    </Box>
  );
}
