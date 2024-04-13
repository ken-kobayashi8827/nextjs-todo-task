import Item from '@/app/components/todo/Item';
import { TodoType } from '@/types/types';
import { fetchTodo } from '@/utils/supabase/actions';
import { Box } from '@chakra-ui/react';

const Todo = async () => {
  const todos: TodoType[] = await fetchTodo();
  return (
    <Box pt='6'>
      {todos!.map((todo) => (
        <Item key={todo.id} todo={todo} />
      ))}
    </Box>
  );
};
export default Todo;
