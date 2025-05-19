import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Card, Table, List, Modal, Button, Empty } from 'antd';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import AddScheduleForm from './AddScheduleForm';
import useSchedules from '../../../hook/useSchedules';
import './Dashboard.scss';
import useTopOrder from '../../../hook/useTopOrder';
import useTopProducts from '../../../hook/useTopProducts';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);


// Dữ liệu cho biểu đồ Profit & Expenses
const profitExpensesData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Profit',
      data: [80, 40, 100, 50, 90, 30, 60],
      backgroundColor: '#1890ff',
    },
    {
      label: 'Expenses',
      data: [50, 30, 70, 40, 60, 20, 50],
      backgroundColor: '#ff6f61',
    },
  ],
};

// Dữ liệu cho biểu đồ Traffic Distribution
const trafficData = {
  labels: ['New', 'Returning'],
  datasets: [
    {
      data: [40, 60], // Tỷ lệ New và Returning
      backgroundColor: ['#1890ff', '#ff6f61'],
    },
  ],
};

// Dữ liệu cho biểu đồ Product Sales
const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [20, 30, 25, 40, 35, 50],
      borderColor: '#1890ff',
      fill: false,
    },  ],
};

// Dữ liệu cho Top Paying Clients
const columnsClient = [
  { title: '', dataIndex: 'id', key: 'id', width: 50 },
  { title: 'Name', dataIndex: 'fullname', key: 'fullname' },
  // { title: 'Priority', dataIndex: 'priority', key: 'priority', render: (text) => <span className={`priority ${text.toLowerCase()}`}>{text}</span> },
  { title: 'Budget', dataIndex: 'totalSpending', key: 'totalSpending' },
];

const columnsProducts = [
  { title: '', dataIndex: 'id', key: 'id', width: 50 },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Price', dataIndex: 'price', key: 'price' },
  { title: 'Sold Quantity', dataIndex: 'soldQuantity', key: 'soldQuantity' },
];


const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { schedules, loading, error, refreshSchedules } = useSchedules(true); // Get only active schedules

  // Format the date for display
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const { orders } = useTopOrder();
  const { products } = useTopProducts();

  // Mở modal
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Callback khi thêm lịch thành công
  const handleAdd = () => {
    setIsModalVisible(false); // Đóng modal
    console.log('Refreshing schedules after adding a new one');
    setTimeout(() => {
      refreshSchedules(); // Refresh danh sách sau một khoảng thời gian ngắn
    }, 100);
  };

  return (
    <div className="dashboard">
      <Row gutter={[16, 16]} className='row-1'>
        {/* Profit & Expenses */}
        <Col xs={24} md={12}>
          <Card title="Profit & Expenses" className='profit-expenses'>
            <Bar data={profitExpensesData} options={{ responsive: true }} />
          </Card>
        </Col>

        {/* Traffic Distribution */}
        <Col xs={24} md={6}>
          <Card title="Traffic Distribution" className='traffic-distribution'>
            <Doughnut data={trafficData} options={{ responsive: true }} />
            <div className="traffic-total">$35,358</div>
          </Card>
        </Col>

        {/* Product Sales */}
        <Col xs={24} md={6}>
          <Card title="Product Sales" className='product-sales'>
            <Line data={salesData} options={{ responsive: true }} />
            <div className="sales-total">$6,820 <span>+8% last year</span></div>
          </Card>
        </Col>
      </Row>      
      <Row gutter={[16, 16]} className='row-2'>
        {/* Upcoming Schedules */}

        <Col xs={24} md={12} >
          <Card            title="Upcoming Schedules" 
            className='upcoming-schedules'
            extra={
              <div>
                <Button 
                  type="text" 
                  icon={<i className="fas fa-sync"></i>} 
                  onClick={refreshSchedules}
                  style={{ marginRight: '8px' }}
                  title="Refresh schedules"
                />
                <Button type="primary" onClick={handleOpenModal}>
                  Add Schedule
                </Button>
              </div>
            }
          >
            {loading ? (
              <div className="loading-container">Loading schedules...</div>
            ) : error ? (
              <div className="error-container">{error}</div>
            ) : schedules.length === 0 ? (
              <Empty description="No upcoming schedules" />
            ) : (
              <List
                dataSource={schedules}
                renderItem={(item) => (
                  <List.Item>
                    <div className="schedule-item">
                      <span className="time">{formatDateTime(item.start_time)}</span>
                      <span className="description">{item.title}</span>
                      {item.description && (
                        <span className="amount">{item.description}</span>
                      )}
                    </div>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>

        {/* Top Paying Clients */}
        <Col xs={24} md={12}>
          <Card title="Top Paying Clients" className='top-paying-clients'>
            <Table
              columns={columnsClient}
              dataSource={orders}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>      

        <Col xs={24} md={12}>
          <Card title="Top Products" className='top-paying-clients'>
            <Table
              columns={columnsProducts}
              dataSource={products}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>      
      </Row>

      <AddScheduleForm
        open={isModalVisible}
        onCancel={handleCancel}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default Dashboard;