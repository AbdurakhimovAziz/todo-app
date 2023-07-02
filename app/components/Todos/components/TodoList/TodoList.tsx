'use client';
import { todoStore, uiStore } from '@/app/store';
import { List } from 'antd';
import { Observer, observer } from 'mobx-react-lite';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoListFooter } from './TodoListFooter';
import { TodoListTypes } from './types';
import { TODO_STATUS } from '@/app/utils/todoStatuses';
import { Title } from '@/app/lib/antd';

export const TodoList = observer(({ todoStatus }: TodoListTypes) => {
  const filteredTodos = todoStore.getFilteredTodos(TODO_STATUS[todoStatus]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedTodo = uiStore.draggedTodo;
    if (!draggedTodo) return;
    todoStore.updateTodo({
      ...draggedTodo,
      status: TODO_STATUS[todoStatus],
    });
  };

  return (
    <div onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}>
      <List
        className="max-w-7xl w-full h-full over"
        bordered
        size="large"
        header={
          <Title level={4} className="capitalize">
            {TODO_STATUS[todoStatus]}
          </Title>
        }
        dataSource={filteredTodos}
        itemLayout="horizontal"
        renderItem={(todo) => (
          <Observer>{() => <TodoItem key={todo.id} todo={todo} />}</Observer>
        )}
        footer={<TodoListFooter todoStatus={todoStatus} />}
      />
    </div>
  );
});
