import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
  AppstoreOutlined,
  FileTextOutlined,
  PictureOutlined,
  SettingOutlined,
  TeamOutlined,
  HistoryOutlined,
  EnvironmentOutlined,
  QuestionCircleOutlined,
  CommentOutlined,
  BookOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { DEFAULT_SITE_NAME } from '@/lib/brand'

const { Header, Sider, Content } = Layout

const items: MenuProps['items'] = [
  { key: '/', icon: <AppstoreOutlined />, label: 'Tổng quan' },
  { key: '/services', icon: <BookOutlined />, label: 'Dịch vụ' },
  { key: '/posts', icon: <FileTextOutlined />, label: 'Bài viết' },
  { key: '/pages', icon: <FileTextOutlined />, label: 'Trang tĩnh' },
  { key: '/slides', icon: <PictureOutlined />, label: 'Slide / Banner' },
  { key: '/testimonials', icon: <CommentOutlined />, label: 'Ý kiến khách' },
  { key: '/faqs', icon: <QuestionCircleOutlined />, label: 'Hỏi đáp' },
  { key: '/albums', icon: <PictureOutlined />, label: 'Album' },
  { key: '/media', icon: <PictureOutlined />, label: 'Media' },
  { key: '/branches', icon: <EnvironmentOutlined />, label: 'Chi nhánh' },
  { key: '/settings', icon: <SettingOutlined />, label: 'Cài đặt' },
  { key: '/users', icon: <TeamOutlined />, label: 'Tài khoản' },
  { key: '/audit-logs', icon: <HistoryOutlined />, label: 'Nhật ký' },
]

export function AdminShell() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', fontWeight: 700, fontSize: 15, borderBottom: '1px solid #f0f0f0' }}>
          {DEFAULT_SITE_NAME}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <h1 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Quản trị</h1>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
