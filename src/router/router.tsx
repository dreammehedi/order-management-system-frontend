// router.tsx
import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

import AddTenant from "@/pages/AddTenant";
import Commissions from "@/pages/Commissions";
import Dashboard from "@/pages/Dashboard";
import EditTenant from "@/pages/EditTenant";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Payments from "@/pages/Payments";
import SchoolAdmins from "@/pages/SchoolAdmins";
import Settings from "@/pages/Settings";
import Tenants from "@/pages/Tenants";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "add-tenant",
            element: <AddTenant />,
          },
          {
            path: "edit-tenant/:id",
            element: <EditTenant />,
          },
          {
            path: "tenants",
            element: <Tenants />,
          },
          {
            path: "payments",
            element: <Payments />,
          },
          {
            path: "commissions",
            element: <Commissions />,
          },
          {
            path: "school-admins/:schoolId",
            element: <SchoolAdmins />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
