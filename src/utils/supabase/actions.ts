'use server';

import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { SignUpFormType } from '@/app/components/auth/form/SignUpForm';
import { LoginFormType } from '@/app/components/auth/form/LoginForm';
import { CreateFormType } from '@/app/components/todo/form/CreateForm';
import { EditFormType } from '@/app/components/todo/form/EditForm';
import { convertSortToQuery } from '../select';

const TODO_TABLE = 'todos';

export async function login(formData: LoginFormType) {
  try {
    const supabase = createClient();

    //TODO: バリデーション追加？
    // const data = {
    //   email: formData.get('email') as string,
    //   password: formData.get('password') as string,
    // };
    const data = {
      email: formData.email,
      password: formData.password,
    };

    const { error } = await supabase.auth.signInWithPassword(data);
  } catch (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/todo');
}

export async function signup(formData: SignUpFormType) {
  try {
    const supabase = createClient();

    //TODO: バリデーション追加？
    // const data = {
    //   email: formData.get('email') as string,
    //   password: formData.get('password') as string,
    // };

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
  } catch (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch (error) {
    redirect('/error');
  }

  redirect('/');
}

export async function createTodo(formData: CreateFormType) {
  try {
    console.log(formData);
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from(TODO_TABLE).insert({
      title: formData.title,
      detail: formData.detail,
      status: formData.status,
      end_date: formData.endDate,
      user_id: userData.user!.id,
    });
  } catch (error) {
    redirect('/error');
  }

  revalidatePath('/todo');
  redirect('/todo');
}

export async function fetchTodo(sort: string, filter: number | string) {
  noStore();
  const query = convertSortToQuery[sort];
  try {
    const supabase = createClient();
    let request = supabase.from(TODO_TABLE).select();
    if (filter !== 'all') {
      request = request.eq('status', filter);
    }

    const { data: todoData, error } = await request.order(query, {
      ascending: query !== 'created_at' ? true : false,
    });
    return todoData;
  } catch (error) {
    redirect('/error');
  }
}

export async function fetchTodoById(todoId: string) {
  noStore();
  try {
    const supabase = createClient();
    const { data: todoData, error } = await supabase
      .from(TODO_TABLE)
      .select()
      .eq('id', todoId);
    return todoData;
  } catch (error) {
    redirect('/error');
  }
}

export async function deleteTodo(todoId: string) {
  try {
    const supabase = createClient();
    await supabase.from(TODO_TABLE).delete().eq('id', todoId);
    revalidatePath('/todo');
  } catch (error) {
    redirect('/error');
  }
}

export async function editTodo(formData: EditFormType, todoId: string) {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from('todos')
      .update({
        title: formData.title,
        detail: formData.detail,
        status: formData.status,
        end_date: formData.endDate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', todoId);
  } catch (error) {
    redirect('/error');
  }
  revalidatePath('/todo');
  redirect('/todo');
}

export async function changeTodoStatus(todoId: string, todoNewStatus: number) {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from('todos')
      .update({ status: todoNewStatus, updated_at: new Date().toISOString })
      .eq('id', todoId);
    revalidatePath('/todo');
  } catch (error) {
    redirect('/error');
  }
}
