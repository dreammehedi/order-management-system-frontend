import { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, message } from 'antd';
import { EditOutlined, UserAddOutlined, EyeOutlined, DeleteOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

interface School {
  key: string;
  id: string;
  schoolName: string;
  principalName: string;
  email: string;
  phone: string;
  totalStudents: number;
  commissionRate: number;
  status: 'active' | 'pending' | 'inactive';
  subscriptionPlan: string;
  admins: number;
}

const Tenants = () => {
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Mock data
  const schools: School[] = [
    {
      key: '1',
      id: 'SCH-001',
      schoolName: 'Springfield High School',
      principalName: 'Dr. Robert Johnson',
      email: 'principal@springfield.edu',
      phone: '+1 (555) 123-4567',
      totalStudents: 850,
      commissionRate: 10,
      status: 'active',
      subscriptionPlan: 'Professional',
      admins: 3,
    },
    {
      key: '2',
      id: 'SCH-002',
      schoolName: 'Riverside Academy',
      principalName: 'Mrs. Sarah Williams',
      email: 'admin@riverside.edu',
      phone: '+1 (555) 234-5678',
      totalStudents: 620,
      commissionRate: 8,
      status: 'active',
      subscriptionPlan: 'Basic',
      admins: 2,
    },
    {
      key: '3',
      id: 'SCH-003',
      schoolName: 'Oakwood School',
      principalName: 'Mr. Michael Brown',
      email: 'contact@oakwood.edu',
      phone: '+1 (555) 345-6789',
      totalStudents: 1200,
      commissionRate: 12,
      status: 'active',
      subscriptionPlan: 'Enterprise',
      admins: 5,
    },
    {
      key: '4',
      id: 'SCH-004',
      schoolName: 'Greenfield School',
      principalName: 'Dr. Emily Davis',
      email: 'info@greenfield.edu',
      phone: '+1 (555) 456-7890',
      totalStudents: 480,
      commissionRate: 10,
      status: 'pending',
      subscriptionPlan: 'Basic',
      admins: 1,
    },
  ];

  const columns: ColumnsType<School> = [
    {
      title: 'School ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span className="text-foreground font-medium">{text}</span>,
    },
    {
      title: 'School Name',
      dataIndex: 'schoolName',
      key: 'schoolName',
      render: (text) => <span className="text-foreground font-semibold">{text}</span>,
    },
    {
      title: 'Principal',
      dataIndex: 'principalName',
      key: 'principalName',
      render: (text) => <span className="text-foreground">{text}</span>,
    },
    {
      title: 'Students',
      dataIndex: 'totalStudents',
      key: 'totalStudents',
      render: (count) => <span className="text-foreground">{count.toLocaleString()}</span>,
      sorter: (a, b) => a.totalStudents - b.totalStudents,
    },
    {
      title: 'Commission',
      dataIndex: 'commissionRate',
      key: 'commissionRate',
      render: (rate) => <span className="text-success font-semibold">{rate}%</span>,
    },
    {
      title: 'Plan',
      dataIndex: 'subscriptionPlan',
      key: 'subscriptionPlan',
      render: (plan) => <Tag color="blue">{plan}</Tag>,
    },
    {
      title: 'Admins',
      dataIndex: 'admins',
      key: 'admins',
      render: (count) => <span className="text-foreground">{count}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          icon={status === 'active' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          color={status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'error'}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedSchool(record);
              setIsDetailModalOpen(true);
            }}
            className="text-primary hover:text-primary/80"
          />
          <Button
            type="text"
            icon={<UserAddOutlined />}
            onClick={() => navigate(`/dashboard/school-admins/${record.id}`)}
            className="text-info hover:text-info/80"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-warning hover:text-warning/80"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => {
              Modal.confirm({
                title: 'Delete School',
                content: `Are you sure you want to delete ${record.schoolName}?`,
                okText: 'Delete',
                okType: 'danger',
                onOk: () => message.success('School deleted successfully'),
              });
            }}
            className="text-destructive hover:text-destructive/80"
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Schools Management</h1>
          <p className="text-muted-foreground">Manage all registered schools in the system.</p>
        </div>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => navigate('/dashboard/add-tenant')}
          className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
          size="large"
        >
          Add New School
        </Button>
      </div>

      <Card className="bg-card">
        <Table
          columns={columns}
          dataSource={schools}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <Modal
        title={<span className="text-foreground text-xl">School Details</span>}
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalOpen(false)} size="large">
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
                <p className="text-foreground font-medium">{selectedSchool.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">School Name</p>
                <p className="text-foreground font-medium">{selectedSchool.schoolName}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Principal Name</p>
                <p className="text-foreground font-medium">{selectedSchool.principalName}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Email</p>
                <p className="text-foreground font-medium">{selectedSchool.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Phone</p>
                <p className="text-foreground font-medium">{selectedSchool.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Students</p>
                <p className="text-foreground font-medium">{selectedSchool.totalStudents.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Commission Rate</p>
                <p className="text-success font-bold">{selectedSchool.commissionRate}%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Subscription Plan</p>
                <Tag color="blue">{selectedSchool.subscriptionPlan}</Tag>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Status</p>
                <Tag
                  icon={selectedSchool.status === 'active' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                  color={selectedSchool.status === 'active' ? 'success' : 'warning'}
                >
                  {selectedSchool.status.toUpperCase()}
                </Tag>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Number of Admins</p>
                <p className="text-foreground font-medium">{selectedSchool.admins}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Tenants;
