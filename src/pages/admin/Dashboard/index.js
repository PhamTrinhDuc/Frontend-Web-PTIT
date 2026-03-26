import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, List, Modal, Button, Empty, Typography, message, Statistic, Tag } from 'antd';
import { 
  SyncOutlined, 
  PlusOutlined, 
  DollarCircleOutlined, 
  ShoppingCartOutlined, 
  SkinOutlined, 
  UserOutlined,
  ArrowUpOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title as ChartTitle, 
  Tooltip, 
  Legend, 
  ArcElement, 
  LineElement, 
  PointElement 
} from 'chart.js';

import AddScheduleForm from './AddScheduleForm';
import useSchedules from '../../../hook/useSchedules';
import './Dashboard.scss';
import useTopOrder from '../../../hook/useTopOrder';
import useTopProducts from '../../../hook/useTopProducts';
import useDashboardStats from '../../../hook/useDashboardStats';
import useMonthlyRevenue from '../../../hook/useMonthlyRevenue';

const { Title, Text } = Typography;

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend, ArcElement, LineElement, PointElement);

// Column definitions for tables
const columnsClient = [
  { 
    title: 'Customer', 
    dataIndex: 'fullname', 
    key: 'fullname',
    render: (text) => <Text strong>{text}</Text>
  },
  { 
    title: 'Spending', 
    dataIndex: 'totalSpending', 
    key: 'totalSpending',
    render: (amount) => <Text type="success">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)}</Text>
  },
];

const columnsProducts = [
  { title: 'Product', dataIndex: 'name', key: 'name', ellipsis: true },
  { 
    title: 'Price', 
    dataIndex: 'price', 
    key: 'price',
    render: (val) => new Intl.NumberFormat('vi-VN').format(val)
  },
  { 
    title: 'Sold', 
    dataIndex: 'soldQuantity', 
    key: 'soldQuantity',
    render: (count) => <Tag color="blue">{count}</Tag>
  },
];

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { schedules, loading: schedulesLoading, error: schedulesError, refreshSchedules } = useSchedules(true);
  const { stats, loading: statsLoading } = useDashboardStats();
  const { revenueData, loading: revenueLoading } = useMonthlyRevenue(currentYear);
  const { orders } = useTopOrder();
  const { products } = useTopProducts();

  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue 2024',
        data: revenueData,
        backgroundColor: '#1890ff',
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="dashboard">
      {/* 4 Overview Stat Cards */}
      <Row gutter={[24, 24]} className="stats-overview">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card revenue">
            <div className="stat-header">
              <div className="stat-label">TOTAL REVENUE</div>
              <div className="stat-icon"><DollarCircleOutlined /></div>
            </div>
            <p className="stat-value">{formatCurrency(stats?.totalRevenue || 0)}</p>
            <div className="stat-footer">
              <span className="trend-up"><ArrowUpOutlined /> 12%</span>
              <span className="trend-label">since last month</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card orders">
            <div className="stat-header">
              <div className="stat-label">TOTAL ORDERS</div>
              <div className="stat-icon"><ShoppingCartOutlined /></div>
            </div>
            <p className="stat-value">{stats?.totalOrders || 0}</p>
            <div className="stat-footer">
              <span className="trend-up"><ArrowUpOutlined /> 8%</span>
              <span className="trend-label">new orders today</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card products">
            <div className="stat-header">
              <div className="stat-label">ACTIVE PRODUCTS</div>
              <div className="stat-icon"><SkinOutlined /></div>
            </div>
            <p className="stat-value">{stats?.totalProducts || 0}</p>
            <div className="stat-footer">
              <span className="trend-label">Available in inventory</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card customers">
            <div className="stat-header">
              <div className="stat-label">TOTAL CUSTOMERS</div>
              <div className="stat-icon"><UserOutlined /></div>
            </div>
            <p className="stat-value">{stats?.totalCustomers || 0}</p>
            <div className="stat-footer">
              <span className="trend-label">Registered users</span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Analysis Section */}
      <Row gutter={[24, 24]} className="main-row">
        <Col xs={24} lg={16}>
          <Card title="Revenue Analytics" className="chart-card">
            <Bar 
              data={revenueChartData} 
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } },
                plugins: { legend: { display: false } }
              }} 
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Traffic Source" className="chart-card">
            <Doughnut 
              data={{
                labels: ['Completed', 'Processing', 'Cancelled'],
                datasets: [{
                  data: [65, 25, 10],
                  backgroundColor: ['#52c41a', '#1890ff', '#ff4d4f'],
                  borderWidth: 0,
                }]
              }} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                cutout: '70%'
              }} 
            />
          </Card>
        </Col>
      </Row>

      {/* Lists and Schedules */}
      <Row gutter={[24, 24]} className="secondary-row">
        <Col xs={24} lg={8}>
          <Card 
            title={<span><HistoryOutlined /> Upcoming Schedules</span>} 
            className="data-card"
            extra={<Button size="small" type="primary" onClick={() => setIsModalVisible(true)}>Add</Button>}
          >
            <div className="schedule-list">
              {schedulesLoading ? <Empty description="Loading..." /> : schedules.length === 0 ? <Empty /> : (
                <List
                  dataSource={schedules.slice(0, 5)}
                  renderItem={(item) => (
                    <div className="schedule-item">
                      <span className="time-box">{formatDateTime(item.start_time)}</span>
                      <div style={{ display: 'inline-block' }}>
                        <span className="title-text">{item.title}</span>
                        {item.description && <span className="desc-text">{item.description}</span>}
                      </div>
                    </div>
                  )}
                />
              )}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card title="Top Clients" className="data-card">
            <Table
              columns={columnsClient}
              dataSource={orders?.slice(0, 5)}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Top Selling" className="data-card">
            <Table
              columns={columnsProducts}
              dataSource={products?.slice(0, 5)}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      <AddScheduleForm
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onAdd={() => {
          setIsModalVisible(false);
          refreshSchedules();
        }}
      />
    </div>
  );
};

export default Dashboard;