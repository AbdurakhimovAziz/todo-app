import { todoStore } from '@/app/store';
import { CheckOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputRef } from 'antd';
import { useRef } from 'react';

export const TodoListFooter = () => {
  const inputRef = useRef<InputRef>(null);
  const [form] = Form.useForm();

  const addtodo = () => {
    const inputValue = form.getFieldValue('todos')[0];
    if (!inputValue) return;
    todoStore.addTodo(inputValue);
    form.setFieldsValue({ todos: [] });
  };

  const addInputField = () => {
    form.submit();
    form.setFieldsValue({ todos: [''] });
  };

  return (
    <Form form={form} onFinish={addtodo} onBlur={addtodo}>
      <Form.List name="todos">
        {(fields, { remove }) => {
          return (
            <>
              {fields.map((field) => (
                <Form.Item
                  wrapperCol={{
                    style: { flexDirection: 'row' },
                  }}
                  key={field.key}
                  name={field.name}
                  extra={
                    <>
                      <Button
                        type="text"
                        onClick={addtodo}
                        icon={<CheckOutlined color="blue" />}
                      />
                      <Button
                        type="text"
                        onClick={() => remove(field.name)}
                        danger
                        icon={<CloseCircleOutlined />}
                      />
                    </>
                  }
                >
                  <Input
                    allowClear
                    ref={inputRef}
                    className="w-[320px]"
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
