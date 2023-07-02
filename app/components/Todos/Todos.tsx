'use client';
import { Title } from '@/app/lib/antd';
import { todoStatusList } from '@/app/utils/todoStatuses';
import { List } from 'antd';
import { TodoList } from './components/TodoList/TodoList';

export const Todos = () => {
  return (
    <>
      <Title level={2}>Todos</Title>
      <div className="w-full overflow-x-auto px-5">
        <List
          grid={{
            gutter: 16,
            column: 5,
          }}
          className="min-w-[1600px]"
          dataSource={todoStatusList}
          renderItem={(todoStatus) => (
            <List.Item>
              <TodoList todoStatus={todoStatus} />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
