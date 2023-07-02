import { todoStore } from '@/app/store';
import { TODO_STATUS } from '@/app/utils/todoStatuses';
import { Button, Form, Input } from 'antd';
import { FocusEvent } from 'react';
import { TodoFormActions } from '../TodoFormActions/TodoFormActions';
import { TodoListTypes } from './types';

export const TodoListFooter = ({ todoStatus }: TodoListTypes) => {
  const [form] = Form.useForm();

  const addtodo = (e?: FocusEvent<HTMLFormElement, Element>) => {
    const inputValue = form.getFieldValue('todos')?.[0];
    if (!inputValue || e?.relatedTarget?.id === 'cancel') return;
    todoStore.addTodo(inputValue, TODO_STATUS[todoStatus]);
    form.setFieldsValue({ todos: [] });
  };

  const addInputField = () => {
    form.submit();
    form.setFieldsValue({ todos: [''] });
  };

  return (
    <Form form={form} onFinish={addtodo} onBlur={addtodo} preserve={false}>
      <Form.List name="todos">
        {(fields, { remove }) => {
          return (
            <>
              {fields.map((field) => (
                <Form.Item
                  wrapperCol={{
                    style: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  }}
                  key={field.key}
                  name={field.name}
                  extra={
                    <TodoFormActions
                      onConfirm={() => addtodo()}
                      onCancel={() => remove(field.name)}
                    />
                  }
                >
                  <Input
                    allowClear
                    autoFocus
                    className="w-full grow"
                    placeholder="input title"
                  />
                </Form.Item>
              ))}
              <Button onClick={addInputField} className="w-full">
                Add todo
              </Button>
            </>
          );
        }}
      </Form.List>
    </Form>
  );
};
