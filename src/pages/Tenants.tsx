// import {
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   DeleteOutlined,
//   EditOutlined,
//   ExclamationCircleOutlined,
//   EyeOutlined,
//   UserAddOutlined,
// } from "@ant-design/icons";
// import {
//   Alert,
//   Button,
//   Card,
//   Empty,
//   message,
//   Modal,
//   Space,
//   Spin,
//   Table,
//   Tag,
// } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   useDeleteTenantMutation,
//   useGetTenantsQuery,
// } from "@/services/feature/tenantSlice";
// import { useAppSelector } from "@/services/store";

// interface School {
//   key: string;
//   id: string;
//   name: string;
//   custom_domain: string;
//   primary_color: string;
//   academic_year_start: string;
//   eiin: string;
//   logo_url: string;
//   favicon_url: string;
//   user_id: string;
//   status: "active" | "pending" | "inactive";
//   created_at?: string;
//   updated_at?: string;
// }

// const Tenants = () => {
//   const navigate = useNavigate();
//   const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

//   // RTK Query hooks
//   const { data, isLoading, error } = useGetTenantsQuery();
//   const [deleteTenant, { isLoading: isDeleting }] = useDeleteTenantMutation();

//   // Get current user from Redux store for user_id
//   const { user } = useAppSelector((state) => state.auth);

//   // Transform API data to match the table structure
//   const schools: School[] =
//     data?.data?.map((tenant: any, index: number) => ({
//       key: tenant.id || `school-${index}`,
//       id: tenant.id || `SCH-${String(index + 1).padStart(3, "0")}`,
//       name: tenant.name || "Unnamed School",
//       custom_domain: tenant.custom_domain || "Not set",
//       primary_color: tenant.primary_color || "#3b82f6",
//       academic_year_start: tenant.academic_year_start || "Not set",
//       eiin: tenant.eiin || "Not set",
//       logo_url: tenant.logo_url || "",
//       favicon_url: tenant.favicon_url || "",
//       user_id: tenant.user_id || "",
//       status: tenant.status || "pending",
//       created_at: tenant.created_at,
//       updated_at: tenant.updated_at,
//     })) || [];

//   const handleDeleteSchool = async (schoolId: string, schoolName: string) => {
//     if (!user?.id) {
//       message.error("User not authenticated. Please login again.");
//       return;
//     }

//     Modal.confirm({
//       title: "Delete School",
//       content: `Are you sure you want to delete "${schoolName}"? This action cannot be undone.`,
//       icon: <ExclamationCircleOutlined className="text-destructive" />,
//       okText: "Delete",
//       okType: "danger",
//       cancelText: "Cancel",
//       confirmLoading: isDeleting,
//       onOk: async () => {
//         try {
//           // Send both school ID and user_id in the request body
//           const deletePayload = {
//             id: schoolId,
//             user_id: user.id,
//           };

//           console.log("Sending delete payload:", deletePayload);

//           await deleteTenant(deletePayload).unwrap();
//           message.success("School deleted successfully");
//         } catch (error: any) {
//           console.error("Delete failed:", error);
//           message.error(error.data?.message || "Failed to delete school");
//         }
//       },
//     });
//   };

//   const handleViewDetails = (record: School) => {
//     setSelectedSchool(record);
//     setIsDetailModalOpen(true);
//   };

//   const columns: ColumnsType<School> = [
//     {
//       title: "School ID",
//       dataIndex: "id",
//       key: "id",
//       render: (text) => (
//         <span className="text-foreground font-medium">{text}</span>
//       ),
//     },
//     {
//       title: "School Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => (
//         <span className="text-foreground font-semibold">{text}</span>
//       ),
//     },
//     {
//       title: "EIIN",
//       dataIndex: "eiin",
//       key: "eiin",
//       render: (text) => <span className="text-foreground">{text}</span>,
//     },
//     {
//       title: "Domain",
//       dataIndex: "custom_domain",
//       key: "custom_domain",
//       render: (domain) => (
//         <a
//           href={domain}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-primary hover:text-primary/80"
//         >
//           {domain}
//         </a>
//       ),
//     },
//     {
//       title: "Academic Year",
//       dataIndex: "academic_year_start",
//       key: "academic_year_start",
//       render: (date) => (
//         <span className="text-foreground">
//           {date === "Not set" ? date : new Date(date).getFullYear()}
//         </span>
//       ),
//     },
//     {
//       title: "Primary Color",
//       dataIndex: "primary_color",
//       key: "primary_color",
//       render: (color) => (
//         <div className="flex items-center space-x-2">
//           <div
//             className="w-4 h-4 rounded-full border border-gray-300"
//             style={{ backgroundColor: color }}
//           />
//           <span className="text-foreground text-xs font-mono">{color}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <Tag
//           icon={
//             status === "active" ? (
//               <CheckCircleOutlined />
//             ) : (
//               <ClockCircleOutlined />
//             )
//           }
//           color={
//             status === "active"
//               ? "success"
//               : status === "pending"
//               ? "warning"
//               : "error"
//           }
//         >
//           {status.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       fixed: "right",
//       render: (_, record) => (
//         <Space size="small">
//           <Button
//             type="text"
//             icon={<EyeOutlined />}
//             onClick={() => handleViewDetails(record)}
//             className="text-primary hover:text-primary/80"
//             title="View Details"
//           />
//           <Button
//             type="text"
//             icon={<UserAddOutlined />}
//             onClick={() => navigate(`/school-admins/${record.id}`)}
//             className="text-info hover:text-info/80"
//             title="Manage Admins"
//           />
//           <Button
//             type="text"
//             icon={<EditOutlined />}
//             className="text-warning hover:text-warning/80"
//             title="Edit School"
//             onClick={() =>
//               navigate(`/edit-tenant/${record.id}`, {
//                 state: { tenant: record },
//               })
//             }
//           />
//           <Button
//             type="text"
//             icon={<DeleteOutlined />}
//             onClick={() => handleDeleteSchool(record.id, record.name)}
//             className="text-destructive hover:text-destructive/80"
//             loading={isDeleting}
//             title="Delete School"
//           />
//         </Space>
//       ),
//     },
//   ];

//   if (error) {
//     return (
//       <div className="p-4">
//         <Alert
//           message="Error Loading Schools"
//           description="Failed to load schools data. Please try again."
//           type="error"
//           showIcon
//         />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">
//             Schools Management
//           </h1>
//           <p className="text-muted-foreground">
//             {isLoading
//               ? "Loading schools..."
//               : `Managing ${schools.length} registered schools`}
//           </p>
//         </div>
//         <div className="flex space-x-2">
//           <Button
//             type="primary"
//             icon={<UserAddOutlined />}
//             onClick={() => navigate("/add-tenant")}
//             className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
//             size="large"
//           >
//             Add New School
//           </Button>
//         </div>
//       </div>

//       <Card className="bg-card">
//         {isLoading ? (
//           <div className="flex justify-center items-center py-12">
//             <Spin size="large" />
//           </div>
//         ) : schools.length === 0 ? (
//           <Empty
//             description="No schools found"
//             image={Empty.PRESENTED_IMAGE_SIMPLE}
//           >
//             <Button type="primary" onClick={() => navigate("/add-tenant")}>
//               Add Your First School
//             </Button>
//           </Empty>
//         ) : (
//           <Table
//             columns={columns}
//             dataSource={schools}
//             pagination={{
//               pageSize: 10,
//               showSizeChanger: true,
//               showQuickJumper: true,
//               showTotal: (total, range) =>
//                 `${range[0]}-${range[1]} of ${total} schools`,
//             }}
//             scroll={{ x: "max-content" }}
//             loading={isLoading}
//           />
//         )}
//       </Card>

//       {/* School Details Modal */}
//       <Modal
//         title={<span className="text-foreground text-xl">School Details</span>}
//         open={isDetailModalOpen}
//         onCancel={() => setIsDetailModalOpen(false)}
//         footer={[
//           <Button
//             key="close"
//             onClick={() => setIsDetailModalOpen(false)}
//             size="large"
//           >
//             Close
//           </Button>,
//         ]}
//         width={700}
//       >
//         {selectedSchool && (
//           <div className="space-y-4 mt-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-muted-foreground text-sm mb-1">School ID</p>
//                 <p className="text-foreground font-medium">
//                   {selectedSchool.id}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-muted-foreground text-sm mb-1">
//                   School Name
//                 </p>
//                 <p className="text-foreground font-medium">
//                   {selectedSchool.name}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-muted-foreground text-sm mb-1">
//                   EIIN Number
//                 </p>
//                 <p className="text-foreground font-medium">
//                   {selectedSchool.eiin}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-muted-foreground text-sm mb-1">Domain</p>
//                 <a
//                   href={selectedSchool.custom_domain}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-primary hover:text-primary/80 font-medium"
//                 >
//                   {selectedSchool.custom_domain}
//                 </a>
//               </div>
//               <div>
//                 <p className="text-muted-foreground text-sm mb-1">
//                   Academic Year Start
//                 </p>
//                 <p className="text-foreground font-medium">
//                   {selectedSchool.academic_year_start === "Not set"
//                     ? "Not set"
//                     : new Date(
//                         selectedSchool.academic_year_start
//                       ).toLocaleDateString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-muted-foreground text-sm mb-1">
//                   Primary Color
//                 </p>
//                 <div className="flex items-center space-x-2">
//                   <div
//                     className="w-6 h-6 rounded-full border border-gray-300"
//                     style={{ backgroundColor: selectedSchool.primary_color }}
//                   />
//                   <span className="text-foreground font-medium font-mono">
//                     {selectedSchool.primary_color}
//                   </span>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-muted-foreground text-sm mb-1">Status</p>
//                 <Tag
//                   icon={
//                     selectedSchool.status === "active" ? (
//                       <CheckCircleOutlined />
//                     ) : (
//                       <ClockCircleOutlined />
//                     )
//                   }
//                   color={
//                     selectedSchool.status === "active" ? "success" : "warning"
//                   }
//                 >
//                   {selectedSchool.status.toUpperCase()}
//                 </Tag>
//               </div>
//               <div>
//                 <p className="text-muted-foreground text-sm mb-1">Logo URL</p>
//                 <p className="text-foreground font-medium truncate">
//                   {selectedSchool.logo_url || "Not set"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-muted-foreground text-sm mb-1">
//                   Favicon URL
//                 </p>
//                 <p className="text-foreground font-medium truncate">
//                   {selectedSchool.favicon_url || "Not set"}
//                 </p>
//               </div>
//               {selectedSchool.created_at && (
//                 <div>
//                   <p className="text-muted-foreground text-sm mb-1">
//                     Created At
//                   </p>
//                   <p className="text-foreground font-medium">
//                     {new Date(selectedSchool.created_at).toLocaleDateString()}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Tenants;
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Empty,
  message,
  Modal,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useDeleteTenantMutation,
  useGetTenantsQuery,
} from "@/services/feature/tenantSlice";
import { useAppSelector } from "@/services/store";

interface School {
  key: string;
  id: string;
  name: string;
  custom_domain: string;
  primary_color: string;
  academic_year_start: string;
  eiin: string;
  logo_url: string;
  favicon_url: string;
  user_id: string;
  status: "active" | "pending" | "inactive";
  created_at?: string;
  updated_at?: string;
}

const Tenants = () => {
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // RTK Query hooks
  const { data, isLoading, error } = useGetTenantsQuery();
  const [deleteTenant, { isLoading: isDeleting }] = useDeleteTenantMutation();

  // Get current user from Redux store for user_id
  const { user } = useAppSelector((state) => state.auth);

  // Transform API data to match the table structure
  const schools: School[] =
    data?.data?.map((tenant: any, index: number) => ({
      key: tenant.id || `school-${index}`,
      id: tenant.id || `SCH-${String(index + 1).padStart(3, "0")}`,
      name: tenant.name || "Unnamed School",
      custom_domain: tenant.custom_domain || "Not set",
      primary_color: tenant.primary_color || "#3b82f6",
      academic_year_start: tenant.academic_year_start || "Not set",
      eiin: tenant.eiin || "Not set",
      logo_url: tenant.logo_url || "",
      favicon_url: tenant.favicon_url || "",
      user_id: tenant.user_id || "",
      status: tenant.status || "pending",
      created_at: tenant.created_at,
      updated_at: tenant.updated_at,
    })) || [];

  const handleDeleteSchool = async (schoolId: string, schoolName: string) => {
    if (!user?.id) {
      message.error("User not authenticated. Please login again.");
      return;
    }

    Modal.confirm({
      title: "Delete School",
      content: `Are you sure you want to delete "${schoolName}"? This action cannot be undone.`,
      icon: <ExclamationCircleOutlined className="text-destructive" />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      confirmLoading: isDeleting,
      onOk: async () => {
        try {
          // Send both school ID and user_id in the request body
          const deletePayload = {
            id: schoolId,
            user_id: user.id,
          };

          console.log("Sending delete payload:", deletePayload);

          await deleteTenant(deletePayload).unwrap();
          message.success("School deleted successfully");
        } catch (error: any) {
          console.error("Delete failed:", error);
          message.error(error.data?.message || "Failed to delete school");
        }
      },
    });
  };

  const handleViewDetails = (record: School) => {
    setSelectedSchool(record);
    setIsDetailModalOpen(true);
  };

  const columns: ColumnsType<School> = [
    {
      title: "School ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <span className="text-foreground font-medium">{text}</span>
      ),
    },
    {
      title: "School Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span className="text-foreground font-semibold">{text}</span>
      ),
    },
    {
      title: "EIIN",
      dataIndex: "eiin",
      key: "eiin",
      render: (text) => <span className="text-foreground">{text}</span>,
    },
    {
      title: "Domain",
      dataIndex: "custom_domain",
      key: "custom_domain",
      render: (domain) => (
        <a
          href={domain}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80"
        >
          {domain}
        </a>
      ),
    },
    {
      title: "Academic Year",
      dataIndex: "academic_year_start",
      key: "academic_year_start",
      render: (date) => (
        <span className="text-foreground">
          {date === "Not set" ? date : new Date(date).getFullYear()}
        </span>
      ),
    },
    {
      title: "Primary Color",
      dataIndex: "primary_color",
      key: "primary_color",
      render: (color) => (
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          />
          <span className="text-foreground text-xs font-mono">{color}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          icon={
            status === "active" ? (
              <CheckCircleOutlined />
            ) : (
              <ClockCircleOutlined />
            )
          }
          color={
            status === "active"
              ? "success"
              : status === "pending"
              ? "warning"
              : "error"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
            className="text-primary hover:text-primary/80"
            title="View Details"
          />
          <Button
            type="text"
            icon={<UserAddOutlined />}
            onClick={() => navigate(`/school-admins/${record.id}`)}
            className="text-info hover:text-info/80"
            title="Manage Admins"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-warning hover:text-warning/80"
            title="Edit School"
            onClick={() =>
              navigate(`/edit-tenant/${record.id}`, {
                state: { tenant: record },
              })
            }
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteSchool(record.id, record.name)}
            className="text-destructive hover:text-destructive/80"
            loading={isDeleting}
            title="Delete School"
          />
        </Space>
      ),
    },
  ];

  if (error) {
    return (
      <div className="p-4">
        <Alert
          message="Error Loading Schools"
          description="Failed to load schools data. Please try again."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Schools Management
          </h1>
          <p className="text-muted-foreground">
            {isLoading
              ? "Loading schools..."
              : `Managing ${schools.length} registered schools`}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => navigate("/add-tenant")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
            size="large"
          >
            Add New School
          </Button>
        </div>
      </div>

      <Card className="bg-card">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spin size="large" />
          </div>
        ) : schools.length === 0 ? (
          <Empty
            description="No schools found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={() => navigate("/add-tenant")}>
              Add Your First School
            </Button>
          </Empty>
        ) : (
          <Table
            columns={columns}
            dataSource={schools}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} schools`,
            }}
            scroll={{ x: "max-content" }}
            loading={isLoading}
          />
        )}
      </Card>

      {/* School Details Modal */}
      <Modal
        title={<span className="text-foreground text-xl">School Details</span>}
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setIsDetailModalOpen(false)}
            size="large"
          >
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedSchool && (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm mb-1">School ID</p>
                <p className="text-foreground font-medium">
                  {selectedSchool.id}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  School Name
                </p>
                <p className="text-foreground font-medium">
                  {selectedSchool.name}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  EIIN Number
                </p>
                <p className="text-foreground font-medium">
                  {selectedSchool.eiin}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Domain</p>
                <a
                  href={selectedSchool.custom_domain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {selectedSchool.custom_domain}
                </a>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Academic Year Start
                </p>
                <p className="text-foreground font-medium">
                  {selectedSchool.academic_year_start === "Not set"
                    ? "Not set"
                    : new Date(
                        selectedSchool.academic_year_start
                      ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Primary Color
                </p>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: selectedSchool.primary_color }}
                  />
                  <span className="text-foreground font-medium font-mono">
                    {selectedSchool.primary_color}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Status</p>
                <Tag
                  icon={
                    selectedSchool.status === "active" ? (
                      <CheckCircleOutlined />
                    ) : (
                      <ClockCircleOutlined />
                    )
                  }
                  color={
                    selectedSchool.status === "active" ? "success" : "warning"
                  }
                >
                  {selectedSchool.status.toUpperCase()}
                </Tag>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Logo URL</p>
                <p className="text-foreground font-medium truncate">
                  {selectedSchool.logo_url || "Not set"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Favicon URL
                </p>
                <p className="text-foreground font-medium truncate">
                  {selectedSchool.favicon_url || "Not set"}
                </p>
              </div>
              {selectedSchool.created_at && (
                <div>
                  <p className="text-muted-foreground text-sm mb-1">
                    Created At
                  </p>
                  <p className="text-foreground font-medium">
                    {new Date(selectedSchool.created_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Tenants;
