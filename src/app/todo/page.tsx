import Item from '@/app/components/todo/Item';
import { TodoType } from '@/types/types';
import { fetchTodo } from '@/utils/supabase/actions';
import { Box, HStack } from '@chakra-ui/react';
import SortForm from '../components/todo/form/SortForm';
import FilterForm from '../components/todo/form/FilterForm';

const Todo = async ({
  searchParams,
}: {
  searchParams?: { sort?: string; filter?: number };
}) => {
  const sort = searchParams?.sort || 'date';
  const filter = searchParams?.filter || 'all';
  const todos: TodoType[] = (await fetchTodo(sort, filter)) || [];
  return (
    <Box pt='6'>
      <HStack justifyContent='flex-end' gap='6'>
        <FilterForm />
        <SortForm />
      </HStack>
      {todos!.map((todo) => (
        <Item key={todo.id} todo={todo} />
      ))}
    </Box>
  );
};
export default Todo;
