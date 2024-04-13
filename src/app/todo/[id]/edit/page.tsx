import EditForm from '@/app/components/todo/form/EditForm';
import { TodoType } from '@/types/types';
import { fetchTodoById } from '@/utils/supabase/actions';

export default async function EditTodo({ params }: { params: { id: string } }) {
  const todoId = params.id;
  const todo: TodoType[] = await fetchTodoById(todoId);
  return <EditForm todo={todo} />;
}
