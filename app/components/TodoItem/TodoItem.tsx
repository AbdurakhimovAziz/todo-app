import { todoStore } from '@/app/store';
import { CheckOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Form, List } from 'antd';
import Input from 'antd/es/input/Input';
import { useState } from 'react';
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

  const updateTodo = () => {
    const updatedTitle = form.getFieldValue('title');
    setIsEditing(false);
    form.resetFields();
    if (!updatedTitle || updatedTitle.trim() === todo.title) return;
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
          >
            <Input autoFocus />
          </Form.Item>
          <Button
            type="text"
            htmlType="submit"
            icon={<CheckOutlined color="blue" />}
          />
          <Button
            type="text"
            htmlType="button"
            onClick={() => setIsEditing(false)}
            danger
            icon={<CloseCircleOutlined />}
          />
        </Form>
      ) : (
        <List.Item.Meta title={todo.title} />
      )}
    </List.Item>
  );
};
