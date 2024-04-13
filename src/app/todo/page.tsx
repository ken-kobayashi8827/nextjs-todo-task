import Item from '@/app/components/todo/Item';
import { TodoType } from '@/types/types';
import { fetchTodo } from '@/utils/supabase/actions';
import { Box } from '@chakra-ui/react';
import SortForm from '../components/todo/form/SortForm';

const Todo = async ({ searchParams }: { searchParams?: { sort?: string } }) => {
  const sort = searchParams?.sort || 'date';
  const todos: TodoType[] = (await fetchTodo(sort)) || [];
  return (
    <Box pt='6'>
      <SortForm />
      {todos!.map((todo) => (
        <Item key={todo.id} todo={todo} />
      ))}
    </Box>
  );
};
export default Todo;
