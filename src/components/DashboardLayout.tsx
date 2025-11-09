// import { useAuth } from "@/hooks/useAuth"; // Update import to use Redux hook
// import { useAppSelector } from "@/services/store";

// import {
//   BarChartOutlined,
//   DashboardOutlined,
//   DollarOutlined,
//   LogoutOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   SettingOutlined,
//   TeamOutlined,
//   UserAddOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
// import { useState } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// const { Header, Sider, Content } = Layout;

// const DashboardLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useAuth(); // Now using Redux-based hook
//   const { user } = useAppSelector((state) => state.auth); // Get user from Redux store

//   const menuItems = [
//     {
//       key: "",
//       icon: <DashboardOutlined />,
//       label: "Dashboard",
//     },
//     {
//       key: "/tenants",
//       icon: <TeamOutlined />,
//       label: "Schools",
//     },
//     {
//       key: "/add-tenant",
//       icon: <UserAddOutlined />,
//       label: "Add School",
//     },
//     {
//       key: "/payments",
//       icon: <DollarOutlined />,
//       label: "Payments",
//     },
//     {
//       key: "/commissions",
//       icon: <BarChartOutlined />,
//       label: "Commissions",
//     },
//     {
//       key: "/settings",
//       icon: <SettingOutlined />,
//       label: "Settings",
//     },
//   ];

//   const userMenuItems = [
//     {
//       key: "logout",
//       icon: <LogoutOutlined />,
//       label: "Logout",
//       onClick: logout,
//     },
//   ];

//   return (
//     <Layout className="min-h-screen">
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         className="bg-sidebar border-r border-sidebar-border"
//         width={250}
//       >
//         <div className="h-16 flex items-center justify-center border-b border-sidebar-border">
//           <h1 className="text-xl font-bold text-sidebar-foreground">
//             {collapsed ? "SA" : "Super Admin"}
//           </h1>
//         </div>
//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           items={menuItems}
//           onClick={({ key }) => navigate(key)}
//           className="bg-sidebar text-sidebar-foreground border-none"
//         />
//       </Sider>
//       <Layout>
//         <Header className="bg-card border-b border-border px-6 flex items-center justify-between h-16">
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             className="text-foreground hover:bg-secondary"
//           />
//           <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
//             <div className="flex items-center gap-3 cursor-pointer hover:bg-secondary px-3 py-2 rounded-lg transition-colors">
//               <span className="text-foreground">
//                 {user?.name || user?.email || "Admin"}
//               </span>
//               <Avatar icon={<UserOutlined />} className="bg-primary" />
//             </div>
//           </Dropdown>
//         </Header>
//         <Content className="p-6 bg-background">
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default DashboardLayout;
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/services/store";
import {
  CrownOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  theme,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { user, role } = useAppSelector((state) => state.auth);

  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken();

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/tenants",
      icon: <TeamOutlined />,
      label: "Schools",
    },
    {
      key: "/add-tenant",
      icon: <UserAddOutlined />,
      label: "Add School",
    },
    // {
    //   key: "/payments",
    //   icon: <DollarOutlined />,
    //   label: "Payments",
    // },
    // {
    //   key: "/commissions",
    //   icon: <BarChartOutlined />,
    //   label: "Commissions",
    // },
    // {
    //   key: "/settings",
    //   icon: <SettingOutlined />,
    //   label: "Settings",
    // },
  ];

  const userMenuItems = [
    {
      key: "user-info",
      label: (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="bg-gradient-to-r from-blue-500 to-purple-500"
            />
            <div className="flex-1 min-w-0">
              <Text
                strong
                className="block text-gray-900 dark:text-white text-sm"
              >
                {user?.name || "Admin User"}
              </Text>
              <Text type="secondary" className="text-xs block">
                {user?.phone_number || user?.email || "No contact info"}
              </Text>
              <div className="flex items-center mt-1">
                <CrownOutlined className="text-yellow-500 text-xs mr-1" />
                <Text type="secondary" className="text-xs">
                  {role || "Administrator"}
                </Text>
              </div>
            </div>
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: logout,
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (isMobile) {
      setCollapsed(true);
    }
    navigate(key);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="min-h-screen bg-background">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        onBreakpoint={(broken) => {
          setIsMobile(broken);
          if (broken) {
            setCollapsed(true);
          }
        }}
        className="bg-sidebar border-r border-sidebar-border fixed lg:relative h-screen z-20"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={250}
      >
        {/* Logo/Brand */}
        <div className="h-16 flex items-center justify-center border-b border-sidebar-border px-4">
          {collapsed ? (
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <CrownOutlined className="text-white text-sm" />
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <CrownOutlined className="text-white text-sm" />
              </div>
              <h1 className="text-lg font-bold text-sidebar-foreground whitespace-nowrap">
                Super Admin
              </h1>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="bg-sidebar text-sidebar-foreground border-none mt-4"
          inlineIndent={16}
        />
      </Sider>

      {/* Main Content Area */}
      <Layout
        className={`transition-all duration-200 ${
          collapsed ? "lg:ml-[80px]" : "lg:ml-[250px]"
        } ${isMobile ? "ml-0" : ""}`}
      >
        {/* Sticky Header */}
        <Header
          className="bg-card border-b border-border px-4 lg:px-6 flex items-center justify-between h-16 sticky top-0 z-10 shadow-sm"
          style={{
            backgroundColor: colorBgContainer,
            borderBottomColor: colorBorder,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
              className="text-foreground hover:bg-secondary lg:flex hidden"
              size="middle"
            />

            {/* Mobile menu button */}
            <Button
              type="text"
              icon={<MenuUnfoldOutlined />}
              onClick={toggleSidebar}
              className="text-foreground hover:bg-secondary lg:hidden flex"
              size="middle"
            />

            {/* Breadcrumb or page title can go here */}
            <div className="hidden sm:block">
              <Text strong className="text-foreground">
                {menuItems.find((item) => item.key === location.pathname)
                  ?.label || "Dashboard"}
              </Text>
            </div>
          </div>

          {/* User Info & Dropdown */}
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
            overlayClassName="w-64"
          >
            <div className="flex items-center gap-3 cursor-pointer hover:bg-secondary px-3 py-2 rounded-lg transition-colors">
              <div className="hidden sm:block text-right">
                <Text strong className="text-foreground text-sm block">
                  {user?.name || "Admin User"}
                </Text>
                <Text type="secondary" className="text-xs block">
                  {role || "Administrator"}
                </Text>
              </div>
              <Avatar
                icon={<UserOutlined />}
                className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-md"
                size="default"
              />
            </div>
          </Dropdown>
        </Header>

        {/* Main Content */}
        <Content className="p-4 lg:p-6 bg-background min-h-[calc(100vh-4rem)]">
          <div
            className="bg-card rounded-lg shadow-sm border border-border p-4 lg:p-6 min-h-full"
            style={{
              backgroundColor: colorBgContainer,
              borderColor: colorBorder,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>

      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </Layout>
  );
};

export default DashboardLayout;
