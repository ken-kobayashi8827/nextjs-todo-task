'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FormInput } from '@/app/components/common/form/FormInput';
import { signup } from '@/utils/supabase/actions';

const SignUpFormSchema = z
  .object({
    email: z
      .string({ required_error: '入力が必須の項目です' })
      .email({ message: '正しいメールアドレスの形式で入力してください' }),
    password: z
      .string({ required_error: '入力が必須の項目です' })
      .min(6, { message: '6文字以上で入力してください' }),
    confirmPassword: z
      .string({ required_error: '入力が必須の項目です' })
      .min(6, { message: '6文字以上で入力してください' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: 'パスワードが一致しません',
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

export default function SignUpForm() {
  const methods = useForm<SignUpFormType>({
    mode: 'onChange',
    resolver: zodResolver(SignUpFormSchema),
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

  const onSubmit = async (params: SignUpFormType) => {
    signup(params);
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
            <FormInput
              type='password'
              register={register('confirmPassword')}
              label='確認用パスワード'
              placeholder='パスワードを入力'
              errMessage={errors.confirmPassword?.message}
            />
            <Button type='submit' w='100%' colorScheme='teal'>
              登録
            </Button>
          </form>
        </FormProvider>
        <Button as={NextLink} href='/' w='100%' colorScheme='blue' mt='3'>
          ログインページへ
        </Button>
      </Box>
    </Flex>
  );
}
