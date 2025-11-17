import { useAuth } from "@/hooks/useAuth";
import {
  CrownFilled,
  GithubFilled,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    phone_number: string;
    password: string;
  }) => {
    const formData = new FormData();
    formData.append("phone_number", values.phone_number);
    formData.append("password", values.password);
    setLoading(true);
    try {
      const success = await login(formData);
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
  // const onFinish = async (values: {
  //   phone_number: string;
  //   password: string;
  // }) => {
  //   setLoading(true);
  //   try {
  //     // Create FormData object
  //     const formData = new FormData();
  //     formData.append("phone_number", values.phone_number);
  //     formData.append("password", values.password);

  //     // Assuming 'login' is updated to accept FormData and send via fetch/axios
  //     // e.g., login = async (formData: FormData) => { ... }
  //     const success = await login(formData);

  //     if (success) {
  //       message.success("Login successful!");
  //       navigate("");
  //     } else {
  //       message.error("Invalid credentials.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     message.error("Login failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // Phone number validation function
  const validatePhoneNumber = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please input your phone number!"));
    }

    // Basic phone number validation (adjust based on your requirements)
    const phoneRegex = /^01[3-9]\d{8}$/; // Bangladeshi phone number format
    if (!phoneRegex.test(value)) {
      return Promise.reject(new Error("Please enter a valid phone number!"));
    }

    return Promise.resolve();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Stars effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <Card
        className="w-full max-w-md bg-gray-800/90 backdrop-blur-sm border-gray-700 shadow-2xl rounded-2xl overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center border-b border-gray-700">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="bg-white/20 p-2 rounded-full">
              <CrownFilled className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Super Admin</h1>
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
            <Form.Item
              name="phone_number"
              rules={[{ validator: validatePhoneNumber }]}
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400" />}
                placeholder="Enter your phone number"
                className="h-12 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 hover:border-purple-500 focus:border-purple-500 transition-colors"
                style={{ fontSize: "16px" }}
                maxLength={11} // Bangladeshi phone numbers are 11 digits
              />
            </Form.Item>

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

      {/* Floating particles */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-gray-400">
        <GithubFilled />
      </div>
    </div>
  );
};

export default Login;
