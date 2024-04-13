import { StatusOptions, TodoStatusType } from '@/types/types';

export const TODO_STATUS: TodoStatusType = {
  INCOMPLETE: 0,
  PROGRESS: 1,
  COMPLETE: 2,
};

export const options: StatusOptions[] = [
  {
    label: '未完了',
    value: TODO_STATUS.INCOMPLETE,
  },
  {
    label: '進行中',
    value: TODO_STATUS.PROGRESS,
  },
  {
    label: '完了',
    value: TODO_STATUS.COMPLETE,
  },
];
