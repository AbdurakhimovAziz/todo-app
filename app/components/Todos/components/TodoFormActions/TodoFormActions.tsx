import { CheckOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { TodoFormActionsProps } from './types';

export const TodoFormActions = ({
  onCancel,
  onConfirm,
}: TodoFormActionsProps) => {
  return (
    <>
      <Button
        type="text"
        onClick={onConfirm}
        icon={<CheckOutlined color="blue" />}
      />
      <Button
        type="text"
        htmlType="button"
        id="cancel"
        onClick={onCancel}
        danger
        icon={<CloseCircleOutlined />}
      />
    </>
  );
};
