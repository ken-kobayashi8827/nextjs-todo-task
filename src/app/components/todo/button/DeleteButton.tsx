'use client';

import { deleteTodo } from '@/utils/supabase/actions';
import { Button } from '@chakra-ui/react';

type PropsType = {
  todoId: string;
};

export default function DeleteButton({ todoId }: PropsType) {
  const handleDelete = async () => {
    await deleteTodo(todoId);
  };

  return (
    <Button w='15%' colorScheme='red' onClick={handleDelete}>
      削除
    </Button>
  );
}
