import { TodoList } from './components/TodoList/TodoList';
import { Layout, Header, Content, Title } from './lib/antd';

const Home = () => (
  <Layout className="flex h-full">
    <Header className="h-auto bg-white p-6 text-center">
      <Title level={1}>Todo App</Title>
    </Header>
    <Content className="grow w-full mx-auto px-20 py-10">
      <Title level={2}>Todos</Title>
      <TodoList />
    </Content>
  </Layout>
);

export default Home;
