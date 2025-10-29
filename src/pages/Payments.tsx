import { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, DatePicker, message, Tag, Space } from 'antd';
import { PlusOutlined, DollarOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

interface Payment {
  key: string;
  id: string;
  schoolName: string;
  studentName: string;
  amount: number;
  commission: number;
  date: string;
  status: 'completed' | 'pending';
  paymentMethod: string;
}

const Payments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock data
  const [payments, setPayments] = useState<Payment[]>([
    {
      key: '1',
      id: 'PAY-001',
      schoolName: 'Springfield High School',
      studentName: 'John Doe',
      amount: 5000,
      commission: 500,
      date: '2024-01-15',
      status: 'completed',
      paymentMethod: 'Credit Card',
    },
    {
      key: '2',
      id: 'PAY-002',
      schoolName: 'Riverside Academy',
      studentName: 'Jane Smith',
      amount: 4500,
      commission: 450,
      date: '2024-01-14',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
    },
    {
      key: '3',
      id: 'PAY-003',
      schoolName: 'Oakwood School',
      studentName: 'Mike Johnson',
      amount: 6000,
      commission: 600,
      date: '2024-01-13',
      status: 'pending',
      paymentMethod: 'Cash',
    },
  ]);

  const columns: ColumnsType<Payment> = [
    {
      title: 'Payment ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span className="text-foreground font-medium">{text}</span>,
    },
    {
      title: 'School Name',
      dataIndex: 'schoolName',
      key: 'schoolName',
      render: (text) => <span className="text-foreground">{text}</span>,
    },
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (text) => <span className="text-foreground">{text}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span className="text-foreground font-semibold">${amount.toLocaleString()}</span>,
    },
    {
      title: 'Commission',
      dataIndex: 'commission',
      key: 'commission',
      render: (commission) => <span className="text-success font-semibold">${commission.toLocaleString()}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span className="text-muted-foreground">{text}</span>,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (text) => <span className="text-foreground">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          icon={status === 'completed' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          color={status === 'completed' ? 'success' : 'warning'}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  const handleAddPayment = async (values: any) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newPayment: Payment = {
        key: String(payments.length + 1),
        id: `PAY-${String(payments.length + 1).padStart(3, '0')}`,
        schoolName: values.schoolName,
        studentName: values.studentName,
        amount: values.amount,
        commission: values.amount * (values.commissionRate / 100),
        date: values.date.format('YYYY-MM-DD'),
        status: 'completed',
        paymentMethod: values.paymentMethod,
      };

      setPayments([newPayment, ...payments]);
      message.success('Payment recorded successfully!');
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to record payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalCommission = payments.reduce((sum, payment) => sum + payment.commission, 0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Payment Collection</h1>
          <p className="text-muted-foreground">Track and manage student payments and commissions.</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
          size="large"
        >
          Record Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-card border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1">Total Payments</p>
              <h3 className="text-2xl font-bold text-foreground">${totalAmount.toLocaleString()}</h3>
            </div>
            <DollarOutlined className="text-4xl text-primary" />
          </div>
        </Card>

        <Card className="bg-card border-l-4 border-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1">Total Commission</p>
              <h3 className="text-2xl font-bold text-success">${totalCommission.toLocaleString()}</h3>
            </div>
            <CheckCircleOutlined className="text-4xl text-success" />
          </div>
        </Card>

        <Card className="bg-card border-l-4 border-info">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1">Transactions</p>
              <h3 className="text-2xl font-bold text-foreground">{payments.length}</h3>
            </div>
            <CheckCircleOutlined className="text-4xl text-info" />
          </div>
        </Card>
      </div>

      <Card className="bg-card">
        <Table
          columns={columns}
          dataSource={payments}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <Modal
        title={<span className="text-foreground text-xl">Record New Payment</span>}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddPayment}
          className="mt-4"
        >
          <Form.Item
            label={<span className="text-foreground">School Name</span>}
            name="schoolName"
            rules={[{ required: true, message: 'Please select school!' }]}
          >
            <Select placeholder="Select school" size="large">
              <Option value="Springfield High School">Springfield High School</Option>
              <Option value="Riverside Academy">Riverside Academy</Option>
              <Option value="Oakwood School">Oakwood School</Option>
              <Option value="Greenfield School">Greenfield School</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="text-foreground">Student Name</span>}
            name="studentName"
            rules={[{ required: true, message: 'Please input student name!' }]}
          >
            <Input placeholder="Enter student name" size="large" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={<span className="text-foreground">Amount ($)</span>}
              name="amount"
              rules={[
                { required: true, message: 'Please input amount!' },
                { type: 'number', min: 1, message: 'Amount must be greater than 0!' },
              ]}
            >
              <Input type="number" placeholder="Enter amount" size="large" />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Commission Rate (%)</span>}
              name="commissionRate"
              rules={[{ required: true, message: 'Please input commission rate!' }]}
              initialValue={10}
            >
              <Input type="number" placeholder="Enter rate" size="large" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={<span className="text-foreground">Payment Date</span>}
              name="date"
              rules={[{ required: true, message: 'Please select date!' }]}
            >
              <DatePicker className="w-full" size="large" />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Payment Method</span>}
              name="paymentMethod"
              rules={[{ required: true, message: 'Please select payment method!' }]}
            >
              <Select placeholder="Select method" size="large">
                <Option value="Credit Card">Credit Card</Option>
                <Option value="Bank Transfer">Bank Transfer</Option>
                <Option value="Cash">Cash</Option>
                <Option value="Check">Check</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button onClick={() => setIsModalOpen(false)} size="large">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
                size="large"
              >
                Record Payment
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Payments;
