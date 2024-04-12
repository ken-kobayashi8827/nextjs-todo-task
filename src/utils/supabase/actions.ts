'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { SignUpFormType } from '@/app/components/auth/form/SignUpForm';
import { LoginFormType } from '@/app/components/auth/form/LoginForm';

export async function login(formData: LoginFormType) {
  const supabase = createClient();
  console.log(formData);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // };
  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/todo');
}

export async function signup(formData: SignUpFormType) {
  //const supabase = createClient();
  console.log(formData);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // };

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  console.log(error);

  // if (error) {
  //   redirect('/error');
  // }

  // revalidatePath('/', 'layout');
  // redirect('/');
}
