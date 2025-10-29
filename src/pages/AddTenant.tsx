import { useState } from 'react';
import { Form, Input, Button, Card, Select, message, Space } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

interface SchoolFormData {
  schoolName: string;
  principalName: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  totalStudents: number;
  commissionRate: number;
  subscriptionPlan: string;
  establishedYear: number;
  notes: string;
}

const AddTenant = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: SchoolFormData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('School data:', values);
      message.success('School added successfully!');
      form.resetFields();
      navigate('/dashboard/tenants');
    } catch (error) {
      message.error('Failed to add school. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Add New School</h1>
        <p className="text-muted-foreground">Register a new school in the management system.</p>
      </div>

      <Card className="bg-card max-w-4xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
          initialValues={{ status: 'active', subscriptionPlan: 'basic', commissionRate: 10 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="text-foreground">School Name</span>}
              name="schoolName"
              rules={[
                { required: true, message: 'Please input school name!' },
                { min: 2, message: 'School name must be at least 2 characters!' },
                { max: 100, message: 'School name must be less than 100 characters!' },
              ]}
            >
              <Input
                placeholder="Enter school name"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Principal Name</span>}
              name="principalName"
              rules={[
                { required: true, message: 'Please input principal name!' },
                { min: 2, message: 'Principal name must be at least 2 characters!' },
                { max: 100, message: 'Principal name must be less than 100 characters!' },
              ]}
            >
              <Input
                placeholder="Enter principal name"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Email</span>}
              name="email"
              rules={[
                { required: true, message: 'Please input email!' },
                { type: 'email', message: 'Please enter a valid email!' },
                { max: 255, message: 'Email must be less than 255 characters!' },
              ]}
            >
              <Input
                placeholder="email@example.com"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Phone</span>}
              name="phone"
              rules={[
                { required: true, message: 'Please input phone number!' },
                { pattern: /^[0-9+\-\s()]+$/, message: 'Please enter a valid phone number!' },
                { max: 20, message: 'Phone number must be less than 20 characters!' },
              ]}
            >
              <Input
                placeholder="+1 (555) 123-4567"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Status</span>}
              name="status"
              rules={[{ required: true, message: 'Please select status!' }]}
            >
              <Select className="bg-secondary">
                <Option value="active">Active</Option>
                <Option value="pending">Pending</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Subscription Plan</span>}
              name="subscriptionPlan"
              rules={[{ required: true, message: 'Please select a plan!' }]}
            >
              <Select className="bg-secondary">
                <Option value="basic">Basic (Up to 500 students)</Option>
                <Option value="professional">Professional (Up to 1000 students)</Option>
                <Option value="enterprise">Enterprise (Unlimited)</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Total Students</span>}
              name="totalStudents"
              rules={[
                { required: true, message: 'Please input total students!' },
                { type: 'number', min: 1, message: 'Must be at least 1 student!' },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter total number of students"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Commission Rate (%)</span>}
              name="commissionRate"
              rules={[
                { required: true, message: 'Please input commission rate!' },
                { type: 'number', min: 0, max: 100, message: 'Must be between 0-100%!' },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter commission percentage"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Established Year</span>}
              name="establishedYear"
              rules={[
                { required: true, message: 'Please input established year!' },
                { type: 'number', min: 1900, max: new Date().getFullYear(), message: 'Please enter a valid year!' },
              ]}
            >
              <Input
                type="number"
                placeholder="e.g., 2015"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>
          </div>

          <Form.Item
            label={<span className="text-foreground">Address</span>}
            name="address"
            rules={[
              { required: true, message: 'Please input address!' },
              { max: 500, message: 'Address must be less than 500 characters!' },
            ]}
          >
            <Input
              placeholder="Enter full address"
              className="bg-secondary border-border text-foreground"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-foreground">Notes</span>}
            name="notes"
            rules={[
              { max: 1000, message: 'Notes must be less than 1000 characters!' },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Additional notes or comments"
              className="bg-secondary border-border text-foreground"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
              >
                Add School
              </Button>
              <Button
                onClick={onReset}
                icon={<CloseOutlined />}
                className="bg-secondary hover:bg-secondary/80 text-foreground border-border"
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddTenant;
