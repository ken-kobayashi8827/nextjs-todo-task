'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FormInput } from '@/app/components/common/form/FormInput';
import { login } from '@/utils/supabase/actions';

const LoginFormSchema = z.object({
  email: z
    .string({ required_error: '入力が必須の項目です' })
    .email({ message: '正しいメールアドレスの形式で入力してください' }),
  password: z
    .string({ required_error: '入力が必須の項目です' })
    .min(6, { message: '6文字以上で入力してください' }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
  const methods = useForm<LoginFormType>({
    mode: 'onChange',
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (params: LoginFormType) => {
    login(params);
  };

  return (
    <Flex
      minH='100vh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Box maxWidth='md'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              type='email'
              register={register('email')}
              label='メールアドレス'
              placeholder='example@example.com'
              errMessage={errors.email?.message}
            />
            <FormInput
              type='password'
              register={register('password')}
              label='パスワード'
              placeholder='パスワードを入力'
              errMessage={errors.password?.message}
            />
            <Button type='submit' w='100%' colorScheme='teal'>
              ログイン
            </Button>
          </form>
        </FormProvider>
        <Button
          as={NextLink}
          href='/auth/signUp'
          w='100%'
          colorScheme='blue'
          mt='3'
        >
          新規登録ページへ
        </Button>
      </Box>
    </Flex>
  );
}
