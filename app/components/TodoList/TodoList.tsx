'use client';
import { todoStore } from '@/app/store';
import { List } from 'antd';
import { observer } from 'mobx-react-lite';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoListFooter } from './TodoListFooter';

export const TodoList = observer(() => {
  return (
    <List
      className="w-1/5"
      bordered
      size="large"
      header={<div>Header</div>}
      dataSource={todoStore.todos.slice()}
      itemLayout="horizontal"
      renderItem={(todo) => <TodoItem key={todo.id} todo={todo} />}
      footer={<TodoListFooter />}
    />
  );
});
