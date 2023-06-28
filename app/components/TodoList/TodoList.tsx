'use client';
import { todoStore } from '@/app/store';
import { observer } from 'mobx-react-lite';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = observer(() => {
  return todoStore.todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
});
