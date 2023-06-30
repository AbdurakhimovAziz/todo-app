import { todoStore } from '@/app/store';
import { Form, List } from 'antd';
import Input from 'antd/es/input/Input';
import { FocusEvent, useState } from 'react';
import { TodoFormActions } from '../TodoFormActions/TodoFormActions';
import { TodoItemActions } from './TodoItemActions';
import { TodoItemProps } from './types';

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
    const updatedTodo = todoStore.updateTodo({
      ...todo,
      title: updatedTitle,
    });
    form.setFieldValue('title', updatedTodo.title);
  };

  return (
    <List.Item actions={todoItemActions}>
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
          <TodoFormActions onCancel={updateTodo} />
        </Form>
      ) : (
        <List.Item.Meta title={todo.title} />
      )}
    </List.Item>
  );
};
