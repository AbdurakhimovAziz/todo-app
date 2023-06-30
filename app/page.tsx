import { Todos } from './components/Todos/Todos';
import { Content, Header, Layout, Title } from './lib/antd';

const Home = () => (
  <Layout className="flex h-full">
    <Header className="h-auto bg-white p-6 text-center">
      <Title level={1}>Todo App</Title>
    </Header>
    <Content className="grow w-full mx-auto px-20 py-10">
      <Todos />
    </Content>
  </Layout>
);

export default Home;
