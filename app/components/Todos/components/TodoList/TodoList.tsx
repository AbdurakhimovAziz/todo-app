'use client';
import { todoStore } from '@/app/store';
import { List } from 'antd';
import { observer } from 'mobx-react-lite';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoListFooter } from './TodoListFooter';
import { TodoListTypes } from './types';
import { TODO_STATUS } from '@/app/utils/todoStatuses';
import { Title } from '@/app/lib/antd';

export const TodoList = observer(({ todoStatus }: TodoListTypes) => {
  const filteredTodos = todoStore.todos.filter(
    (todo) => todo.status === TODO_STATUS[todoStatus]
  );

  return (
    <List
      className="w-full h-full"
      bordered
      size="large"
      header={
        <Title level={4} className="capitalize">
          {TODO_STATUS[todoStatus]}
        </Title>
      }
      dataSource={filteredTodos}
      itemLayout="horizontal"
      renderItem={(todo) => <TodoItem key={todo.id} todo={todo} />}
      footer={<TodoListFooter todoStatus={todoStatus} />}
    />
  );
});
