import { Todo } from '@/app/models/Todo';
import React from 'react';

export const TodoItem = ({ todo }: { todo: Todo }) => {
  return <div>{todo.title}</div>;
};
