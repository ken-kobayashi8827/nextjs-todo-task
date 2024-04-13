export type TodoType = {
  id: string;
  user_id: string;
  title: string;
  detail: string;
  end_date: string;
  status: number;
  created_at: string;
  updated_at: string;
};

export type StatusOptionsType = {
  label: string;
  value: number;
};

export type SortOptionsType = {
  label: string;
  value: string;
};

export type TodoStatusType = {
  INCOMPLETE: number;
  PROGRESS: number;
  COMPLETE: number;
};

export type convertSortToQueryType = {
  [key: string]: string;
};

export type FilterOptionsType = {
  label: string;
  value?: number | string;
};
