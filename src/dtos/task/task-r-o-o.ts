import { Task } from '@/models/task.model';

export type MinimalTaskROO = Omit<
  Task,
  'dueDate' | 'createdAt' | 'updatedAt'
> & {
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};
