import {
  convertSortToQueryType,
  SortOptionsType,
  StatusOptionsType,
  TodoStatusType,
} from '@/types/types';

export const TODO_STATUS: TodoStatusType = {
  INCOMPLETE: 0,
  PROGRESS: 1,
  COMPLETE: 2,
};

export const todoStatusOptions: StatusOptionsType[] = [
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

export const todoSortOptions: SortOptionsType[] = [
  {
    label: '作成日時',
    value: 'date',
  },
  {
    label: '期限',
    value: 'deadline',
  },
  {
    label: '進行度',
    value: 'progress',
  },
];
export const convertSortToQuery: convertSortToQueryType = {
  date: 'created_at',
  deadline: 'end_date',
  progress: 'status',
};
