import { useAuth } from "@/hooks/useAuth";
import { CrownFilled, LockOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    try {
      const success = await login(data);
      if (success) {
        message.success("Login successful!");
        navigate("/");
      } else {
        message.error("Invalid credentials.");
      }
    } catch (error) {
      console.log(error);
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 relative overflow-hidden">
      {/* Background elements remain the same */}

      <Card
        className="w-full max-w-md bg-gray-800/90 backdrop-blur-sm border-gray-700 shadow-2xl rounded-2xl overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center border-b border-gray-700">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="bg-white/20 p-2 rounded-full">
              <CrownFilled className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Login</h1>
          </div>
          <p className="text-blue-200 text-sm">
            Welcome back! Please sign in to continue
          </p>
        </div>

        <div className="p-8">
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            className="space-y-6"
          >
            {/* Email Field */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="h-12 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:border-purple-500 focus:border-purple-500 transition-colors"
                prefix={<LockOutlined className="text-gray-400" />}
                style={{ fontSize: "16px" }}
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                className="h-12 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:border-purple-500 focus:border-purple-500 transition-colors"
                style={{ fontSize: "16px" }}
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                size="large"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>
          </Form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Secure access to your administration panel
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
