import { Card, Row, Col, Statistic } from 'antd';
import {
  TeamOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Schools',
      value: 24,
      icon: <TeamOutlined className="text-4xl text-primary" />,
      color: 'border-primary',
    },
    {
      title: 'Total Commission',
      value: '$47,760',
      icon: <CheckCircleOutlined className="text-4xl text-success" />,
      color: 'border-success',
    },
    {
      title: 'Payments This Month',
      value: '$466,000',
      icon: <ClockCircleOutlined className="text-4xl text-warning" />,
      color: 'border-warning',
    },
    {
      title: 'New Schools',
      value: 4,
      icon: <UserAddOutlined className="text-4xl text-info" />,
      color: 'border-info',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your school management system.</p>
      </div>

      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              className={`bg-card border-l-4 ${stat.color} hover:shadow-lg transition-shadow`}
              bordered
            >
              <div className="flex items-center justify-between">
                <Statistic
                  title={<span className="text-muted-foreground">{stat.title}</span>}
                  value={stat.value}
                  valueStyle={{ color: 'hsl(var(--foreground))' }}
                />
                {stat.icon}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} className="mt-6">
        <Col xs={24} lg={16}>
          <Card
            title={<span className="text-foreground">Recent Activity</span>}
            className="bg-card"
          >
            <div className="space-y-4">
              {[
                { action: 'Payment received', tenant: 'Springfield High School - $5,000', time: '2 hours ago' },
                { action: 'New school added', tenant: 'Riverside Academy', time: '5 hours ago' },
                { action: 'Commission earned', tenant: '$720 from Oakwood School', time: '1 day ago' },
                { action: 'New admin added', tenant: 'Greenfield School', time: '2 days ago' },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <div>
                    <p className="text-foreground font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.tenant}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={<span className="text-foreground">Quick Actions</span>}
            className="bg-card"
          >
            <div className="space-y-3">
              <button className="w-full p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-left font-medium">
                <UserAddOutlined className="mr-2" />
                Add New School
              </button>
              <button className="w-full p-4 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-left font-medium">
                <TeamOutlined className="mr-2" />
                View All Schools
              </button>
              <button className="w-full p-4 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-left font-medium">
                <SettingOutlined className="mr-2" />
                View Commissions
              </button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
