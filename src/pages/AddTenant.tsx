import { useCreateTenantMutation } from "@/services/feature/tenantSlice";
import { useAppSelector } from "@/services/store"; // Import the Redux hook
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, message, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

interface TenantFormData {
  name: string;
  custom_domain: string;
  primary_color: string;
  academic_year_start: any;
  eiin: string;
  logo_url: string;
  favicon_url: string;
}

const AddTenant = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [createTenant] = useCreateTenantMutation();

  // Get user from persisted Redux state
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Log the user data to verify it's coming from persisted state
    console.log("User from persisted state:", user);
  }, [user]);

  const onFinish = async (values: TenantFormData) => {
    setLoading(true);
    try {
      // Use the actual user ID from persisted Redux state
      const adminUserId = user?.id;

      if (!adminUserId) {
        message.error("User not authenticated. Please login again.");
        return;
      }

      const tenantData = {
        name: values.name,
        custom_domain: values.custom_domain,
        primary_color: values.primary_color,
        academic_year_start: values.academic_year_start.format("YYYY-MM-DD"),
        eiin: values.eiin,
        // logo_url: values.logo_url || "default-logo",
        // favicon_url: values.favicon_url || "default-favicon",
        user_id: adminUserId, // This is from persisted Redux state
      };

      console.log("Sending tenant data:", tenantData);

      const result = await createTenant(tenantData).unwrap();

      if (result.success) {
        message.success("School added successfully!");
        form.resetFields();
        navigate("/tenants");
      } else {
        message.error(result.message || "Failed to add school");
      }
    } catch (error: any) {
      console.error("Error creating tenant:", error);
      message.error(
        error.data?.message || "Failed to add school. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const fillSampleData = () => {
    form.setFieldsValue({
      name: "Local School",
      custom_domain: "http://localhost:5173",
      primary_color: "#3b82f6",
      academic_year_start: dayjs(),
      eiin: "123456",
      logo_url: "https://example.com/logo.png",
      favicon_url: "https://example.com/favicon.ico",
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Add New School
        </h1>
        <p className="text-muted-foreground">
          Register a new school in the management system.
        </p>
      </div>

      <Card className="bg-card max-w-4xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
          initialValues={{
            primary_color: "#3b82f6",
            custom_domain: "http://localhost:5173",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label={<span className="text-foreground">School Name</span>}
              name="name"
              rules={[
                { required: true, message: "Please input school name!" },
                {
                  min: 2,
                  message: "School name must be at least 2 characters!",
                },
                {
                  max: 100,
                  message: "School name must be less than 100 characters!",
                },
              ]}
            >
              <Input
                placeholder="Enter school name"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Custom Domain</span>}
              name="custom_domain"
              rules={[
                { required: true, message: "Please input custom domain!" },
                { type: "url", message: "Please enter a valid URL!" },
                {
                  max: 255,
                  message: "Domain must be less than 255 characters!",
                },
              ]}
            >
              <Input
                placeholder="http://localhost:5173"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Primary Color</span>}
              name="primary_color"
              rules={[
                { required: true, message: "Please input primary color!" },
                {
                  pattern: /^#[0-9A-Fa-f]{6}$/,
                  message: "Must be 6-digit hex color with # (e.g., #3b82f6)",
                },
              ]}
            >
              <Input
                placeholder="#3b82f6"
                className="bg-secondary border-border text-foreground"
                addonBefore={
                  <div
                    className="w-4 h-4 rounded border"
                    style={{
                      backgroundColor:
                        form.getFieldValue("primary_color") || "#3b82f6",
                    }}
                  />
                }
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-foreground">Academic Year Start</span>
              }
              name="academic_year_start"
              rules={[
                {
                  required: true,
                  message: "Please select academic year start date!",
                },
              ]}
            >
              <DatePicker
                className="w-full bg-secondary border-border text-foreground"
                placeholder="Select start date"
                format="YYYY-MM-DD"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">EIIN Number</span>}
              name="eiin"
              rules={[
                { required: true, message: "Please input EIIN number!" },
                { pattern: /^\d{6}$/, message: "Must be exactly 6 digits!" },
              ]}
            >
              <Input
                placeholder="123456"
                className="bg-secondary border-border text-foreground"
                maxLength={6}
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Logo URL</span>}
              name="logo_url"
              rules={[
                {
                  max: 500,
                  message: "Logo URL must be less than 500 characters!",
                },
              ]}
            >
              <Input
                placeholder="https://example.com/logo.png"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-foreground">Favicon URL</span>}
              name="favicon_url"
              rules={[
                {
                  max: 500,
                  message: "Favicon URL must be less than 500 characters!",
                },
              ]}
            >
              <Input
                placeholder="https://example.com/favicon.ico"
                className="bg-secondary border-border text-foreground"
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!user} // Disable if no user data
                icon={<SaveOutlined />}
                className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
              >
                {user ? "Add School" : "Please Login First"}
              </Button>
              <Button
                onClick={onReset}
                icon={<CloseOutlined />}
                className="bg-secondary hover:bg-secondary/80 text-foreground border-border"
              >
                Reset
              </Button>
              <Button
                onClick={fillSampleData}
                className="bg-secondary hover:bg-secondary/80 text-foreground border-border"
              >
                Fill Sample Data
              </Button>
              <Button
                onClick={() => navigate("/tenants")}
                className="bg-secondary hover:bg-secondary/80 text-foreground border-border"
              >
                Back to Schools
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddTenant;
