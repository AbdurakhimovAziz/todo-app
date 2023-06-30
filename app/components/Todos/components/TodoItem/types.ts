import { Todo } from '@/app/models/Todo';

export type TodoItemProps = {
  todo: Todo;
};

export type TodoItemActionsProps = {
  todoId: string;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
};
