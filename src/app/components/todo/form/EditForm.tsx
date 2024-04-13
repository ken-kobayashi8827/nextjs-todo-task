'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Flex } from '@chakra-ui/react';
import { FormInput } from '../../common/form/FormInput';
import NextLink from 'next/link';
import { TodoType } from '@/types/types';
import { editTodo } from '@/utils/supabase/actions';
import { FormSelect } from '../../common/form/FormSelect';
import { todoStatusOptions } from '@/utils/select';

type PropsType = {
  todo: TodoType[];
};

const EditFormSchema = z.object({
  title: z.string({ required_error: '入力が必須の項目です' }),
  detail: z.string({ required_error: '入力が必須の項目です' }),
  status: z.string().transform((val) => Number(val)),
  endDate: z.string({ required_error: '入力が必須の項目です' }),
});

export type EditFormType = z.infer<typeof EditFormSchema>;

export default function EditForm({ todo }: PropsType) {
  const methods = useForm<EditFormType>({
    mode: 'onChange',
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      title: todo[0].title,
      detail: todo[0].detail,
      status: todo[0].status,
      endDate: new Date(todo[0].end_date).toISOString().slice(0, 10),
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (params: EditFormType) => {
    editTodo(params, todo[0].id);
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
              編集完了
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
