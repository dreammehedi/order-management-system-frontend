import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import AddTenant from "./pages/AddTenant";
import Commissions from "./pages/Commissions";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Payments from "./pages/Payments";
import SchoolAdmins from "./pages/SchoolAdmins";
import Settings from "./pages/Settings";
import Tenants from "./pages/Tenants";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#3b82f6",
          colorBgContainer: "hsl(220, 13%, 11%)",
          colorBgElevated: "hsl(220, 13%, 11%)",
          colorBorder: "hsl(220, 13%, 18%)",
          colorText: "hsl(210, 40%, 98%)",
          colorTextSecondary: "hsl(215, 20%, 65%)",
        },
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="add-tenant" element={<AddTenant />} />
              <Route path="tenants" element={<Tenants />} />
              <Route path="payments" element={<Payments />} />
              <Route path="commissions" element={<Commissions />} />
              <Route
                path="school-admins/:schoolId"
                element={<SchoolAdmins />}
              />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
