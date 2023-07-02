import { todoStore } from '@/app/store';
import { TodoItemActionsProps } from './types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const TodoItemActions = ({
  todoId,
  isEditing,
  setIsEditing,
}: TodoItemActionsProps) => {
  return [
    !isEditing && (
      <Button
        type="primary"
        shape="circle"
        key="edit"
        size="small"
        onClick={() => setIsEditing(true)}
        icon={<EditOutlined />}
      />
    ),
    <Button
      type="primary"
      shape="circle"
      key="edit"
      size="small"
      danger
      onClick={() => todoStore.removeTodo(todoId)}
      icon={<DeleteOutlined />}
    />,
  ];
};
