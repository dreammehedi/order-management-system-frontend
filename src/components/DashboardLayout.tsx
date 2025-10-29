import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import {
  DashboardOutlined,
  UserAddOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DollarOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/dashboard/tenants',
      icon: <TeamOutlined />,
      label: 'Schools',
    },
    {
      key: '/dashboard/add-tenant',
      icon: <UserAddOutlined />,
      label: 'Add School',
    },
    {
      key: '/dashboard/payments',
      icon: <DollarOutlined />,
      label: 'Payments',
    },
    {
      key: '/dashboard/commissions',
      icon: <BarChartOutlined />,
      label: 'Commissions',
    },
    {
      key: '/dashboard/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-sidebar border-r border-sidebar-border"
        width={250}
      >
        <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">
            {collapsed ? 'SA' : 'Super Admin'}
          </h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="bg-sidebar text-sidebar-foreground border-none"
        />
      </Sider>
      <Layout>
        <Header className="bg-card border-b border-border px-6 flex items-center justify-between h-16">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-foreground hover:bg-secondary"
          />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-secondary px-3 py-2 rounded-lg transition-colors">
              <span className="text-foreground">{user?.name}</span>
              <Avatar icon={<UserOutlined />} className="bg-primary" />
            </div>
          </Dropdown>
        </Header>
        <Content className="p-6 bg-background">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
