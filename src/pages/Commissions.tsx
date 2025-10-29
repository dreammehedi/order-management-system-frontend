import { Card, Table, DatePicker, Select, Space } from 'antd';
import { DollarOutlined, RiseOutlined, PercentageOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface CommissionData {
  key: string;
  schoolName: string;
  totalPayments: number;
  commissionRate: number;
  commissionEarned: number;
  transactions: number;
}

const Commissions = () => {
  // Mock data
  const commissionData: CommissionData[] = [
    {
      key: '1',
      schoolName: 'Springfield High School',
      totalPayments: 125000,
      commissionRate: 10,
      commissionEarned: 12500,
      transactions: 42,
    },
    {
      key: '2',
      schoolName: 'Riverside Academy',
      totalPayments: 98000,
      commissionRate: 8,
      commissionEarned: 7840,
      transactions: 35,
    },
    {
      key: '3',
      schoolName: 'Oakwood School',
      totalPayments: 156000,
      commissionRate: 12,
      commissionEarned: 18720,
      transactions: 56,
    },
    {
      key: '4',
      schoolName: 'Greenfield School',
      totalPayments: 87000,
      commissionRate: 10,
      commissionEarned: 8700,
      transactions: 28,
    },
  ];

  const columns: ColumnsType<CommissionData> = [
    {
      title: 'School Name',
      dataIndex: 'schoolName',
      key: 'schoolName',
      render: (text) => <span className="text-foreground font-medium">{text}</span>,
    },
    {
      title: 'Total Payments',
      dataIndex: 'totalPayments',
      key: 'totalPayments',
      render: (amount) => <span className="text-foreground">${amount.toLocaleString()}</span>,
      sorter: (a, b) => a.totalPayments - b.totalPayments,
    },
    {
      title: 'Commission Rate',
      dataIndex: 'commissionRate',
      key: 'commissionRate',
      render: (rate) => <span className="text-foreground">{rate}%</span>,
    },
    {
      title: 'Commission Earned',
      dataIndex: 'commissionEarned',
      key: 'commissionEarned',
      render: (amount) => <span className="text-success font-bold">${amount.toLocaleString()}</span>,
      sorter: (a, b) => a.commissionEarned - b.commissionEarned,
    },
    {
      title: 'Transactions',
      dataIndex: 'transactions',
      key: 'transactions',
      render: (count) => <span className="text-muted-foreground">{count}</span>,
    },
  ];

  const totalPayments = commissionData.reduce((sum, item) => sum + item.totalPayments, 0);
  const totalCommission = commissionData.reduce((sum, item) => sum + item.commissionEarned, 0);
  const avgCommissionRate = (commissionData.reduce((sum, item) => sum + item.commissionRate, 0) / commissionData.length).toFixed(1);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Commission Reports</h1>
        <p className="text-muted-foreground">Track earnings from school payments and commissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-card border-l-4 border-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1">Total Commission</p>
              <h3 className="text-3xl font-bold text-success">${totalCommission.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground mt-1">This month</p>
            </div>
            <DollarOutlined className="text-5xl text-success" />
          </div>
        </Card>

        <Card className="bg-card border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1">Total Payments Processed</p>
              <h3 className="text-3xl font-bold text-foreground">${totalPayments.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground mt-1">Across all schools</p>
            </div>
            <RiseOutlined className="text-5xl text-primary" />
          </div>
        </Card>

        <Card className="bg-card border-l-4 border-info">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1">Avg Commission Rate</p>
              <h3 className="text-3xl font-bold text-foreground">{avgCommissionRate}%</h3>
              <p className="text-sm text-muted-foreground mt-1">Across {commissionData.length} schools</p>
            </div>
            <PercentageOutlined className="text-5xl text-info" />
          </div>
        </Card>
      </div>

      <Card className="bg-card mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Filter Reports</h3>
          <Space wrap>
            <RangePicker size="large" />
            <Select defaultValue="all" size="large" style={{ width: 200 }}>
              <Option value="all">All Schools</Option>
              <Option value="Springfield High School">Springfield High School</Option>
              <Option value="Riverside Academy">Riverside Academy</Option>
              <Option value="Oakwood School">Oakwood School</Option>
              <Option value="Greenfield School">Greenfield School</Option>
            </Select>
          </Space>
        </div>
      </Card>

      <Card className="bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Commission Breakdown by School</h3>
        <Table
          columns={columns}
          dataSource={commissionData}
          pagination={false}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Earning Schools</h3>
          <div className="space-y-4">
            {commissionData
              .sort((a, b) => b.commissionEarned - a.commissionEarned)
              .slice(0, 3)
              .map((school, index) => (
                <div key={school.key} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <span className="text-foreground font-medium">{school.schoolName}</span>
                  </div>
                  <span className="text-success font-bold">${school.commissionEarned.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </Card>

        <Card className="bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Commission Distribution</h3>
          <div className="space-y-4">
            {commissionData.map((school) => (
              <div key={school.key}>
                <div className="flex justify-between mb-2">
                  <span className="text-foreground text-sm">{school.schoolName}</span>
                  <span className="text-muted-foreground text-sm">
                    ${school.commissionEarned.toLocaleString()} ({((school.commissionEarned / totalCommission) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-success h-2 rounded-full"
                    style={{ width: `${(school.commissionEarned / totalCommission) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Commissions;
