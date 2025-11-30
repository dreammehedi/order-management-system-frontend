import {
  useCreatOrderMutation,
  useGetOrdersQuery,
} from "@/services/auth/authSlice";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { socket } from "./socket";

interface Item {
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  items: Item[];
}

// Stripe wrapper for drawer
const stripePromise = loadStripe(
  "pk_test_51Rbyr32Kr5nrbbDmWgLY3Gr2Gu5OVaraQUWPa5K6EBQnNnXzTs0DYteFoyKo7ETKL0xwinY5mPWoCr7JQxBo7T1M00RX8mYQQw"
);

const OrdersPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const { data, isLoading: isGeting, refetch } = useGetOrdersQuery();
  const [createOrder] = useCreatOrderMutation();

  const orders: Order[] =
    data?.data?.map((order: any) => ({
      id: order.id,
      paymentMethod: order.paymentMethod,
      paymentStatus:
        order.paymentStatus.charAt(0).toUpperCase() +
        order.paymentStatus.slice(1),
      orderStatus:
        order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1),
      items: order.items,
    })) || [];

  // Real-time update
  useEffect(() => {
    // Listen for real-time updates
    socket.on("orderUpdate", (data) => {
      console.log("📡 Real-time update received:", data);
      alert("Order Status: " + data.status);
    });

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("🔴 Socket connection error:", err.message);
      alert("Socket error: " + err.message);
    });

    return () => {
      socket.off("orderUpdate");
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [refetch]);

  const columns: ColumnsType<Order> = [
    { title: "S/N", render: (_, __, index) => index + 1 },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => {
        const color =
          status === "Paid" ? "green" : status === "Pending" ? "orange" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => {
        const color =
          status === "Completed"
            ? "green"
            : status === "Processing"
            ? "blue"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const handleCreateOrder = async (values: any) => {
    if (loading) return;
    setLoading(true);

    try {
      // 1️⃣ Create Order API call
      const response: any = await createOrder(values).unwrap();

      if (!response.success) {
        message.error(response.message || "Failed to create order");
        setLoading(false);
        return;
      }

      const order = response.data?.data;
      console.log("Order created:", order);

      // 2️⃣ If Stripe, confirm payment
      if (order.paymentInfo?.clientSecret) {
        if (!stripe || !elements) {
          message.error("Stripe not loaded");
          setLoading(false);
          return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.confirmCardPayment(
          order.paymentInfo.clientSecret,
          {
            payment_method: {
              card,
              billing_details: { email: "demo@gmail.com" },
            },
          }
        );

        if (result.error) {
          message.error(result.error.message || "Stripe payment failed");
        } else if (result.paymentIntent?.status === "succeeded") {
          // message.success("🔥 Payment Successful!");
        } else {
          message.info("Payment status: " + result.paymentIntent?.status);
        }
      } else {
        message.success("Order created successfully!");
      }

      form.resetFields();
      setDrawerOpen(false);
      refetch();
    } catch (err: any) {
      message.error(err?.data?.message || "Error creating order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => setDrawerOpen(true)}>
          New Order
        </Button>
      </div>

      <Table<Order>
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={isGeting}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              size="small"
              columns={[
                { title: "Item Title", dataIndex: "title", key: "title" },
                { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                { title: "Price", dataIndex: "price", key: "price" },
                {
                  title: "Total",
                  key: "total",
                  render: (_, item) => item.price * item.quantity,
                },
              ]}
              dataSource={record.items.map((item, index) => ({
                ...item,
                key: index,
              }))}
              pagination={false}
            />
          ),
          rowExpandable: (record) => record.items.length > 0,
        }}
      />

      <Drawer
        title="Create New Order"
        width={480}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrder}>
          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            initialValue="stripe"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="paypal">Paypal</Select.Option>
              <Select.Option value="stripe">Stripe</Select.Option>
            </Select>
          </Form.Item>

          <Form.List
            name="items"
            initialValue={[{ title: "", quantity: 1, price: 0 }]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    align="baseline"
                    style={{ display: "flex", marginBottom: 8 }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      rules={[{ required: true, message: "Missing title" }]}
                    >
                      <Input placeholder="Item Title" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[{ required: true, message: "Missing quantity" }]}
                    >
                      <InputNumber min={1} placeholder="Quantity" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "price"]}
                      rules={[{ required: true, message: "Missing price" }]}
                    >
                      <InputNumber min={0} placeholder="Price" />
                    </Form.Item>
                    <Button type="link" onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add Item
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Stripe Card Element */}
          <Form.Item
            className="*:text-white"
            shouldUpdate={(prev, curr) =>
              prev.paymentMethod !== curr.paymentMethod
            }
          >
            <CardElement className="!text-white ami" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? "Processing..." : "Create Order & Pay"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default function OrdersPageWrapper() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <OrdersPage />
      </Elements>
    </>
  );
}
