import React from 'react';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        key: '/admin/dashboard',
        icon: <UserOutlined />,
        label: 'Dashboard',
    },
    {
        key: '/admin/category',
        icon: <VideoCameraOutlined />,
        label: 'Category',
    },
    {
        key: '/admin/products',
        icon: <UploadOutlined />,
        label: 'Products',
    },
];

// Helper to format breadcrumb items
const generateBreadcrumbs = (pathname) => {
    const pathParts = pathname.split('/').filter(Boolean); // removes empty items
    const breadcrumbs = pathParts.map((part, index) => {
        const url = '/' + pathParts.slice(0, index + 1).join('/');
        return {
            title:
                part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '), // Capitalized
            href: url,
        };
    });
    return breadcrumbs;
};

const AdminLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();

    const breadcrumbItems = generateBreadcrumbs(location.pathname);

    return (
        <Layout style={{ height: '100vh' }}>
  <Sider
    breakpoint="lg"
    collapsedWidth="0"
  >
    <div className="demo-logo-vertical flex items-center justify-center h-[100px] m-10 py-10">
      <img className="m-10" width={140} src="/quickcartLogo.png" alt="" />
    </div>
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={items}
      onClick={({ key }) => navigate(key)}
    />
  </Sider>

  <Layout>
    <Header style={{ height: 64, padding: 0, background: colorBgContainer }} />
    
    <div style={{ padding: '0 16px', height: 'calc(100vh - 64px - 48px)', overflow: 'auto' }}>
      <Breadcrumb
        style={{ margin: '16px 0' }}
        items={[
          { title: <a onClick={() => navigate('/admin')}>Home</a> },
          ...breadcrumbItems.map((item, i) => ({
            title:
              i === breadcrumbItems.length - 1 ? (
                <span>{item.title}</span>
              ) : (
                <a onClick={() => navigate(item.href)}>{item.title}</a>
              ),
          })),
        ]}
      />
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </div>
    </div>

    <Footer style={{ height: 48, textAlign: 'center' }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  </Layout>
</Layout>

    );
};

export default AdminLayout;
