import { TODO_STATUS } from '../utils/todoStatuses';

export interface Todo {
  id: string;
  title: string;
  status: TODO_STATUS;
  createdAt: Date;
  deletedAt: Date | null;
}
