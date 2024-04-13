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

export type StatusOptions = {
  label: string;
  value: number;
};

export type TodoStatusType = {
  INCOMPLETE: number;
  PROGRESS: number;
  COMPLETE: number;
};
