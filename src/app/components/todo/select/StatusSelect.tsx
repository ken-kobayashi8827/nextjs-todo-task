'use client';

import { todoStatusOptions } from '@/utils/select';
import { changeTodoStatus } from '@/utils/supabase/actions';
import { Select } from '@chakra-ui/react';

type PropsType = {
  todoId: string;
  todoStatus: number;
};

export default function StatusSelect({ todoId, todoStatus }: PropsType) {
  const handleChangeSelect = (newStatus: number) => {
    changeTodoStatus(todoId, newStatus);
  };

  return (
    <Select
      bg='white'
      w='40%'
      value={todoStatus}
      onChange={(e: ChangeE<HTMLSelectElement>) =>
        handleChangeSelect(parseInt(e.target.value))
      }
    >
      {todoStatusOptions.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
