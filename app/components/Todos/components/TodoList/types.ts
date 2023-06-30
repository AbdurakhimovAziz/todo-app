import { TODO_STATUS } from '@/app/utils/todoStatuses';

export type TodoListTypes = {
  todoStatus: keyof typeof TODO_STATUS;
};
