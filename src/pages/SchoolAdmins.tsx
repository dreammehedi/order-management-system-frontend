// import {
//   Button,
//   Card,
//   Form,
//   Input,
//   message,
//   Modal,
//   Select,
//   Space,
//   Table,
//   Tag,
// } from "antd";
// import { useState } from "react";

// import {
//   DeleteOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   PlusOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import type { ColumnsType } from "antd/es/table";
// import { useNavigate, useParams } from "react-router-dom";

// const { Option } = Select;

// interface Admin {
//   key: string;
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   status: "active" | "inactive";
// }

// const SchoolAdmins = () => {
//   const { schoolId } = useParams();
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);

//   // Mock data
//   const [admins, setAdmins] = useState<Admin[]>([
//     {
//       key: "1",
//       id: "ADM-001",
//       name: "John Smith",
//       email: "john.smith@springfield.edu",
//       phone: "+1 (555) 111-2222",
//       role: "Principal",
//       status: "active",
//     },
//     {
//       key: "2",
//       id: "ADM-002",
//       name: "Mary Johnson",
//       email: "mary.johnson@springfield.edu",
//       phone: "+1 (555) 333-4444",
//       role: "Vice Principal",
//       status: "active",
//     },
//     {
//       key: "3",
//       id: "ADM-003",
//       name: "David Wilson",
//       email: "david.wilson@springfield.edu",
//       phone: "+1 (555) 555-6666",
//       role: "Admin Staff",
//       status: "active",
//     },
//   ]);

//   const columns: ColumnsType<Admin> = [
//     {
//       title: "Admin ID",
//       dataIndex: "id",
//       key: "id",
//       render: (text) => (
//         <span className="text-foreground font-medium">{text}</span>
//       ),
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => (
//         <div className="flex items-center gap-2">
//           <UserOutlined className="text-primary" />
//           <span className="text-foreground font-semibold">{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//       render: (text) => (
//         <div className="flex items-center gap-2">
//           <MailOutlined className="text-muted-foreground" />
//           <span className="text-foreground">{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//       render: (text) => (
//         <div className="flex items-center gap-2">
//           <PhoneOutlined className="text-muted-foreground" />
//           <span className="text-foreground">{text}</span>
//         </div>
//       ),
//     },
//     {
//       title: "Role",
//       dataIndex: "role",
//       key: "role",
//       render: (role) => <Tag color="blue">{role}</Tag>,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <Tag color={status === "active" ? "success" : "error"}>
//           {status.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Button
//           type="text"
//           icon={<DeleteOutlined />}
//           danger
//           onClick={() => {
//             Modal.confirm({
//               title: "Remove Admin",
//               content: `Are you sure you want to remove ${record.name} as an admin?`,
//               okText: "Remove",
//               okType: "danger",
//               onOk: () => {
//                 setAdmins(admins.filter((admin) => admin.key !== record.key));
//                 message.success("Admin removed successfully");
//               },
//             });
//           }}
//         />
//       ),
//     },
//   ];

//   const handleAddAdmin = async (values: any) => {
//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const newAdmin: Admin = {
//         key: String(admins.length + 1),
//         id: `ADM-${String(admins.length + 1).padStart(3, "0")}`,
//         name: values.name,
//         email: values.email,
//         phone: values.phone,
//         role: values.role,
//         status: "active",
//       };

//       setAdmins([...admins, newAdmin]);
//       message.success("Admin added successfully!");
//       setIsModalOpen(false);
//       form.resetFields();
//     } catch (error) {
//       message.error("Failed to add admin. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="mb-6">
//         <Button
//           type="text"
//           onClick={() => navigate("/tenants")}
//           className="mb-4 text-primary hover:text-primary/80"
//         >
//           ← Back to Schools
//         </Button>
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground mb-2">
//               School Admins
//             </h1>
//             <p className="text-muted-foreground">
//               Manage administrators for {schoolId || "Springfield High School"}
//             </p>
//           </div>
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => setIsModalOpen(true)}
//             className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
//             size="large"
//           >
//             Add Admin
//           </Button>
//         </div>
//       </div>

//       <Card className="bg-card mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="p-4 bg-secondary rounded-lg">
//             <p className="text-muted-foreground text-sm mb-1">Total Admins</p>
//             <p className="text-2xl font-bold text-foreground">
//               {admins.length}
//             </p>
//           </div>
//           <div className="p-4 bg-secondary rounded-lg">
//             <p className="text-muted-foreground text-sm mb-1">Active Admins</p>
//             <p className="text-2xl font-bold text-success">
//               {admins.filter((a) => a.status === "active").length}
//             </p>
//           </div>
//           <div className="p-4 bg-secondary rounded-lg">
//             <p className="text-muted-foreground text-sm mb-1">School ID</p>
//             <p className="text-lg font-medium text-foreground">
//               {schoolId || "SCH-001"}
//             </p>
//           </div>
//         </div>
//       </Card>

//       <Card className="bg-card">
//         <Table
//           columns={columns}
//           dataSource={admins}
//           pagination={{ pageSize: 10 }}
//         />
//       </Card>

//       <Modal
//         title={<span className="text-foreground text-xl">Add New Admin</span>}
//         open={isModalOpen}
//         onCancel={() => {
//           setIsModalOpen(false);
//           form.resetFields();
//         }}
//         footer={null}
//         width={600}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleAddAdmin}
//           className="mt-4"
//         >
//           <Form.Item
//             label={<span className="text-foreground">Full Name</span>}
//             name="name"
//             rules={[
//               { required: true, message: "Please input admin name!" },
//               {
//                 min: 2,
//                 max: 100,
//                 message: "Name must be between 2-100 characters!",
//               },
//             ]}
//           >
//             <Input placeholder="Enter full name" size="large" />
//           </Form.Item>

//           <Form.Item
//             label={<span className="text-foreground">Email</span>}
//             name="email"
//             rules={[
//               { required: true, message: "Please input email!" },
//               { type: "email", message: "Please enter a valid email!" },
//             ]}
//           >
//             <Input placeholder="admin@school.edu" size="large" />
//           </Form.Item>

//           <Form.Item
//             label={<span className="text-foreground">Phone</span>}
//             name="phone"
//             rules={[
//               { required: true, message: "Please input phone number!" },
//               {
//                 pattern: /^[0-9+\-\s()]+$/,
//                 message: "Please enter a valid phone number!",
//               },
//             ]}
//           >
//             <Input placeholder="+1 (555) 123-4567" size="large" />
//           </Form.Item>

//           <Form.Item
//             label={<span className="text-foreground">Role</span>}
//             name="role"
//             rules={[{ required: true, message: "Please select role!" }]}
//           >
//             <Select placeholder="Select role" size="large">
//               <Option value="Principal">Principal</Option>
//               <Option value="Vice Principal">Vice Principal</Option>
//               <Option value="Admin Staff">Admin Staff</Option>
//               <Option value="Accountant">Accountant</Option>
//               <Option value="IT Administrator">IT Administrator</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item className="mb-0">
//             <Space className="w-full justify-end">
//               <Button
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   form.resetFields();
//                 }}
//                 size="large"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
//                 size="large"
//               >
//                 Add Admin
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default SchoolAdmins;
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateTenantAdminMutation,
  useGetTenantWithAdminsQuery,
} from "@/services/feature/tenantAdminSlice";
import {
  DeleteOutlined,
  PhoneOutlined,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ColumnsType, UploadProps } from "antd/es/table";
import type { RcFile, UploadFile } from "antd/es/upload/interface";

interface AdminUser {
  id: string;
  username: string;
  phone_number: string;
  role: string;
}

interface TenantWithAdmins {
  tenant: {
    id: string;
    name: string;
    // ... other tenant fields
  };
  admin_users: AdminUser[];
  active_admin_user_count: number;
  inactive_admin_user_count: number;
}

const SchoolAdmins = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<UploadFile | null>(null);

  const {
    data: tenantData,
    isLoading,
    error,
    refetch,
  } = useGetTenantWithAdminsQuery(schoolId!, {
    skip: !schoolId,
  });
  const [createTenantAdmin] = useCreateTenantAdminMutation();

  // Transform API data to match table structure
  const admins: AdminUser[] = tenantData?.data?.admin_users || [];

  const columns: ColumnsType<AdminUser> = [
    {
      title: "Admin ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <span className="text-foreground font-medium">{text}</span>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => (
        <div className="flex items-center gap-2">
          <UserOutlined className="text-primary" />
          <span className="text-foreground font-semibold">{text}</span>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text) => (
        <div className="flex items-center gap-2">
          <PhoneOutlined className="text-muted-foreground" />
          <span className="text-foreground">{text}</span>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          onClick={() => {
            Modal.confirm({
              title: "Remove Admin",
              content: `Are you sure you want to remove ${record.username} as an admin?`,
              okText: "Remove",
              okType: "danger",
              onOk: () => {
                // TODO: Implement delete API call here
                message.success("Admin removed successfully");
                refetch(); // Refetch to update list
              },
            });
          }}
        />
      ),
    },
  ];

  const uploadProps: UploadProps = {
    beforeUpload: (file: RcFile) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }
      if (isJpgOrPng && isLt2M) {
        setImageFile(
          file ? { uid: file.uid, name: file.name, originFileObj: file } : null
        );
      }
      return false; // Prevent auto-upload
    },
    maxCount: 1,
    listType: "picture",
    accept: "image/*",
  };

  const handleAddAdmin = async (values: any) => {
    if (!schoolId || !imageFile?.originFileObj) {
      message.error("Missing required fields or image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("phone_number", values.phone_number);
      formData.append("password", values.password);
      formData.append("tenant_id", schoolId);
      formData.append("image_url", imageFile.originFileObj as File);

      const result = await createTenantAdmin(formData).unwrap();

      if (result.success) {
        message.success("Admin added successfully!");
        setIsModalOpen(false);
        form.resetFields();
        setImageFile(null);
        refetch(); // Refetch the list
      } else {
        message.error(result.message || "Failed to add admin");
      }
    } catch (error: any) {
      console.error("Error adding admin:", error);
      message.error(
        error.data?.message || "Failed to add admin. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="p-4">
        <Alert
          message="Error Loading Admins"
          description="Failed to load admin data. Please try again."
          type="error"
          showIcon
          action={
            <Button size="small" onClick={refetch}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button
          type="text"
          onClick={() => navigate("/tenants")}
          className="mb-4 text-primary hover:text-primary/80"
        >
          ← Back to Schools
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              School Admins
            </h1>
            <p className="text-muted-foreground">
              Manage administrators for{" "}
              {tenantData?.data?.tenant?.name || schoolId || "School"}
            </p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
            size="large"
          >
            Add Admin
          </Button>
        </div>
      </div>

      <Card className="bg-card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-muted-foreground text-sm mb-1">Total Admins</p>
            <p className="text-2xl font-bold text-foreground">
              {tenantData?.data?.active_admin_user_count +
                tenantData?.data?.inactive_admin_user_count || admins.length}
            </p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-muted-foreground text-sm mb-1">Active Admins</p>
            <p className="text-2xl font-bold text-success">
              {tenantData?.data?.active_admin_user_count ||
                admins.filter((a) => a.role === "ADMIN").length}
            </p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-muted-foreground text-sm mb-1">School Name</p>
            <p className="text-lg font-medium text-foreground">
              {tenantData?.data?.tenant?.name || "SCH-001"}
            </p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <img
              src={tenantData?.data?.tenant?.logo_url}
              className="size-10"
              alt=""
            />
          </div>
        </div>
      </Card>

      <Card className="bg-card">
        <Table
          columns={columns}
          dataSource={admins}
          pagination={{ pageSize: 10 }}
          loading={isLoading}
        />
      </Card>

      <Modal
        title={<span className="text-foreground text-xl">Add New Admin</span>}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setImageFile(null);
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddAdmin}
          className="mt-4"
        >
          <Form.Item
            label={<span className="text-foreground">Username</span>}
            name="username"
            rules={[
              { required: true, message: "Please input username!" },
              {
                min: 2,
                max: 50,
                message: "Username must be between 2-50 characters!",
              },
            ]}
          >
            <Input
              placeholder="Enter username (e.g., mehedi01212)"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-foreground">Phone Number</span>}
            name="phone_number"
            rules={[
              { required: true, message: "Please input phone number!" },
              {
                pattern: /^[0-9+\-\s()]+$/,
                message: "Please enter a valid phone number!",
              },
            ]}
          >
            <Input placeholder="01730143239" size="large" />
          </Form.Item>

          <Form.Item
            label={<span className="text-foreground">Password</span>}
            name="password"
            rules={[
              { required: true, message: "Please input password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>

          <Form.Item
            label={<span className="text-foreground">Profile Image</span>}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e && e.fileList;
            }}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  form.resetFields();
                  setImageFile(null);
                }}
                size="large"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
                size="large"
              >
                Add Admin
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SchoolAdmins;
