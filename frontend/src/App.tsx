import { Space, Layout, Button, Row, Col } from "antd";
import { AntdTable } from "./components/AntdTable";
import AntModalForm from "./components/AntModalForm";


const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};

function App() {
  return (
    <Space direction="vertical" style={{ width: '100%', height: '100vh' }} >
      <Layout>
        <Content style={contentStyle}>
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 15, margin: '10px' }}>
            <AntModalForm />
          </div>
          <AntdTable />
        </Content>
      </Layout>
    </Space>
  );
}

export default App;
