import { todoStore, uiStore } from '@/app/store';
import { Form, List } from 'antd';
import Input from 'antd/es/input/Input';
import { FocusEvent, useState } from 'react';
import { TodoFormActions } from '../TodoFormActions/TodoFormActions';
import { TodoItemActions } from './TodoItemActions';
import { TodoItemProps } from './types';
import { Todo } from '@/app/models/Todo';
import { observer } from 'mobx-react-lite';
import { action, runInAction, when } from 'mobx';

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const todoItemActions = TodoItemActions({
    todoId: todo.id,
    isEditing,
    setIsEditing,
  });

  const [form] = Form.useForm();

  const updateTodo = (e?: FocusEvent<HTMLFormElement, Element>) => {
    const updatedTitle = form.getFieldValue('title');
    setIsEditing(false);
    form.resetFields();
    if (
      !updatedTitle ||
      updatedTitle.trim() === todo.title ||
      e?.relatedTarget?.id === 'cancel'
    )
      return;
    const trimmedTitle = updatedTitle.trim();
    const updatedTodo = todoStore.updateTodo({
      ...todo,
      title: trimmedTitle,
    });
    form.setFieldValue('title', updatedTodo.title);
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleDragStart = (e: React.DragEvent) => {
    console.log('drag start');
    uiStore.setDraggedTodo(todo);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    console.log('drag enter');
    e.stopPropagation();
    e.currentTarget.classList.add('dragover-todo');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('drag leave/end');
    e.currentTarget.classList.remove('dragover-todo');
  };

  const handleDrop = action(
    async (e: React.DragEvent<HTMLDivElement>, todo: Todo) => {
      console.log('drop');
      e.preventDefault();
      e.currentTarget.classList.remove('dragover-todo');
      const draggedTodo = uiStore.draggedTodo;
      if (!draggedTodo) return;

      // if (draggedTodo.status !== todo.status) {
      //   todoStore.updateTodo({
      //     ...draggedTodo,
      //     status: todo.status,
      //   });
      // }
      // await when(() => draggedTodo.status === todo.status);
      todoStore.swapTodos(draggedTodo, todo);
      uiStore.setDraggedTodo(null);
    }
  );

  return (
    <List.Item
      actions={!isEditing ? todoItemActions : undefined}
      draggable={!isEditing}
      onDragStart={(e) => handleDragStart(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragEnd(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDrop={(e) => handleDrop(e, todo)}
      className={!isEditing ? 'cursor-grab' : ''}
    >
      {isEditing ? (
        <Form
          form={form}
          className="flex w-full"
          onFinish={updateTodo}
          onBlur={updateTodo}
          initialValues={{ title: todo.title }}
        >
          <Form.Item
            name="title"
            className="mb-0 grow"
            rules={[{ required: true, message: 'Please input title!' }]}
            shouldUpdate
          >
            <Input autoFocus />
          </Form.Item>
          <TodoFormActions onCancel={cancelUpdate} />
        </Form>
      ) : (
        <List.Item.Meta className="pointer-events-none" title={todo.title} />
      )}
    </List.Item>
  );
};
