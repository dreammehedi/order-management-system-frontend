import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        message.success('Login successful!');
        navigate('/dashboard');
      } else {
        message.error('Invalid credentials. Use admin@example.com / password');
      }
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Super Admin</h1>
          <p className="text-muted-foreground">Sign in to access the dashboard</p>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-muted-foreground" />}
              placeholder="Email"
              className="bg-secondary border-border text-foreground"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-muted-foreground" />}
              placeholder="Password"
              className="bg-secondary border-border text-foreground"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-none h-10"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 p-4 bg-secondary/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground text-center">
            Demo credentials:<br />
            <span className="text-foreground font-medium">admin@example.com</span> / <span className="text-foreground font-medium">password</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
