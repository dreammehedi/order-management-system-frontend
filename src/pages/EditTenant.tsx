import {
  ArrowLeftOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  message,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useUpdateTenantMutation } from "@/services/feature/tenantSlice";
import { useAppSelector } from "@/services/store";
import dayjs from "dayjs";

interface TenantFormData {
  name: string;
  custom_domain: string;
  primary_color: string;
  academic_year_start: any;
  eiin: string;
  logo_url: string;
  favicon_url: string;
}

const EditTenant = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [updateTenant] = useUpdateTenantMutation();
  const { user } = useAppSelector((state) => state.auth);

  // Get tenant data from navigation state (passed from Tenants page)
  const tenantData = (location.state as { tenant?: any })?.tenant;

  // Helper to normalize domain (strip http/https://)
  const normalizeDomain = (value: string): string => {
    return value.replace(/^https?:\/\//, "").trim();
  };

  // Set form values when data is available
  useEffect(() => {
    if (tenantData) {
      console.log("Setting form values with tenant data:", tenantData);

      form.setFieldsValue({
        name: tenantData.name,
        custom_domain: tenantData.custom_domain,
        primary_color: tenantData.primary_color,
        academic_year_start: tenantData.academic_year_start
          ? dayjs(tenantData.academic_year_start)
          : null,
        eiin: tenantData.eiin,
        logo_url: tenantData.logo_url,
        favicon_url: tenantData.favicon_url,
      });
    } else {
      // If no data passed, navigate back (or handle error as needed)
      message.error("Tenant data not found. Please go back and try again.");
      navigate("/tenants");
    }
  }, [tenantData, form, navigate]);

  const onFinish = async (values: TenantFormData) => {
    if (!id) {
      message.error("Missing required information");
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        id: id,
        name: values.name,
        custom_domain: normalizeDomain(values.custom_domain), // Normalize before sending
        primary_color: values.primary_color,
        academic_year_start: values.academic_year_start.format("YYYY-MM-DD"),
        eiin: values.eiin,
        logo_url: values.logo_url,
        favicon_url: values.favicon_url,
      };

      console.log("Sending update payload:", updateData);

      const result = await updateTenant(updateData).unwrap();

      if (result.success) {
        message.success("School updated successfully!");
        navigate("/tenants");
      } else {
        message.error(result.message || "Failed to update school");
      }
    } catch (error: any) {
      console.error("Error updating tenant:", error);
      message.error(
        error.data?.message || "Failed to update school. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    // Reset to original values
    if (tenantData) {
      form.setFieldsValue({
        name: tenantData.name,
        custom_domain: tenantData.custom_domain,
        primary_color: tenantData.primary_color,
        academic_year_start: tenantData.academic_year_start
          ? dayjs(tenantData.academic_year_start)
          : null,
        eiin: tenantData.eiin,
        logo_url: tenantData.logo_url,
        favicon_url: tenantData.favicon_url,
      });
      message.info("Form reset to original values");
    }
  };

  // Fill with your specific data for testing
  const fillWithYourData = () => {
    form.setFieldsValue({
      name: "school 2",
      custom_domain: "school-2.com",
      primary_color: "#ddd436",
      academic_year_start: dayjs("2025-10-19"),
      eiin: "423235",
      logo_url: "logo image",
      favicon_url: "favicon image",
    });
    message.info("Form filled with your test data");
  };

  if (!tenantData) {
    return (
      <div className="p-4">
        <Alert
          message="Error Loading School Data"
          description="Tenant data not available. Please try again from the schools list."
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => navigate("/tenants")}>
              Back to Schools
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Update School
        </h1>
        <p className="text-muted-foreground">
          Update school in the management system.
        </p>
      </div>
      <div className="mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/tenants")}
          className="mb-4 text-foreground hover:text-foreground/80"
        >
          Back to Schools
        </Button>
      </div>

      <Card className="bg-card max-w-4xl">
        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
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
                {
                  max: 255,
                  message: "Domain must be less than 255 characters!",
                },
              ]}
            >
              <Input
                placeholder="school-2.com"
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
                  message: "Must be 6-digit hex color with # (e.g., #ddd436)",
                },
              ]}
            >
              <Input
                placeholder="#ddd436"
                className="bg-secondary border-border text-foreground"
                addonBefore={
                  <div
                    className="w-4 h-4 rounded border border-gray-300"
                    style={{
                      backgroundColor:
                        form.getFieldValue("primary_color") || "#ddd436",
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
                placeholder="423235"
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
                placeholder="logo image"
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
                placeholder="favicon image"
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
                icon={<SaveOutlined />}
                className="bg-primary hover:bg-primary/90 text-primary-foreground border-none"
              >
                Update School
              </Button>
              <Button
                onClick={onReset}
                icon={<CloseOutlined />}
                className="bg-secondary hover:bg-secondary/80 text-foreground border-border"
              >
                Reset Changes
              </Button>
              <Button
                onClick={fillWithYourData}
                className="bg-secondary hover:bg-secondary/80 text-foreground border-border"
              >
                Fill Test Data
              </Button>
              <Button
                onClick={() => navigate("/tenants")}
                className="bg-secondary hover:bg-secondary/80 text-foreground border-border"
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditTenant;
