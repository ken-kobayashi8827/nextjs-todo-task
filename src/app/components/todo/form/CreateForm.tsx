'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex, FormControl, Select } from '@chakra-ui/react';
import { FormInput } from '../../common/form/FormInput';
import NextLink from 'next/link';
import { createTodo } from '@/utils/supabase/actions';
import { todoStatusOptions } from '@/utils/select';
import { FormSelect } from '../../common/form/FormSelect';

const CreateFormSchema = z.object({
  title: z.string({ required_error: '入力が必須の項目です' }),
  detail: z.string({ required_error: '入力が必須の項目です' }),
  status: z.string().transform((val) => Number(val)),
  endDate: z.string({ required_error: '入力が必須の項目です' }),
});

export type CreateFormType = z.infer<typeof CreateFormSchema>;

export default function CreateForm() {
  const methods = useForm<CreateFormType>({
    mode: 'onChange',
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      title: '',
      detail: '',
      endDate: new Date().toISOString().slice(0, 10),
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (params: CreateFormType) => {
    createTodo(params);
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
              type='text'
              register={register('title')}
              label='TODO名'
              placeholder='TODO名'
              errMessage={errors.title?.message}
            />
            <FormInput
              type='text'
              register={register('detail')}
              label='TODO詳細'
              placeholder='TODO詳細'
              errMessage={errors.detail?.message}
            />
            <FormSelect
              label='進捗'
              register={register('status')}
              options={todoStatusOptions}
            />
            <FormInput
              type='date'
              register={register('endDate')}
              label='タスク終了日'
              placeholder='タスク終了日'
              errMessage={errors.endDate?.message}
            />
            <Button type='submit' w='100%' colorScheme='blue'>
              追加
            </Button>
          </form>
        </FormProvider>
        <Button as={NextLink} href='/todo' w='100%' colorScheme='red' mt='3'>
          TODO一覧
        </Button>
      </Box>
    </Flex>
  );
}
