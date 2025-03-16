import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Card, Table, List, Modal, Button} from 'antd';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import AddScheduleForm from './AddScheduleForm';
import './Dashboard.scss';

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
    },
  ],
};

// Dữ liệu cho Upcoming Schedules
const schedules = [
  { time: '09:30 am', description: 'Payment received from John', amount: '$188.90' },
  { time: '10:00 am', description: 'New sale recorded', amount: '#ML-5467' },
  { time: '11:00 am', description: 'Payment was made of $44.95 to Michael' },
  { time: '12:00 am', description: 'New sale recorded', amount: '#ML-5467' },
  { time: '12:30 am', description: 'New arrival recorded' },
];

// Dữ liệu cho Top Paying Clients
const columns = [
  { title: '', dataIndex: 'id', key: 'id', width: 50 },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Priority', dataIndex: 'priority', key: 'priority', render: (text) => <span className={`priority ${text.toLowerCase()}`}>{text}</span> },
  { title: 'Budget', dataIndex: 'budget', key: 'budget' },
];

const clientsData = [
  { id: 1, name: 'Sunil Joshi', priority: 'Low', budget: '$3.9' },
  { id: 2, name: 'Andrew McDownland', priority: 'Medium', budget: '$24.5k' },
  { id: 3, name: 'Christopher Jamil', priority: 'High', budget: '$12.8k' },
  { id: 4, name: 'Niwel Joshi', priority: 'Low', budget: '$2.4k' },
  { id: 5, name: 'Tim Geroge', priority: 'Critical', budget: '$5.4k' },
];


const Dashboard = () => {

  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch danh sách lịch trình
  // useEffect(() => {
  //   fetch('http://localhost:5000/api/upcoming-schedules')
  //     .then(res => res.json())
  //     .then(data => setUpcomingSchedules(data));
  // }, []);

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
    // fetchSchedules(); // Refresh danh sách
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
          <Card title="Upcoming Schedules" className='upcoming-schedules'
            extra={
              <Button type="primary" onClick={handleOpenModal} style={{ float: 'right' }}>
                Add Schedule
              </Button>
            }
          >
            <List
              dataSource={schedules}
              renderItem={(item) => (
                <List.Item>
                  <div className="schedule-item">
                    <span className="time">{item.time}</span>
                    <span className="description">{item.description}</span>
                    {item.amount && <span className="amount">{item.amount}</span>}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Top Paying Clients */}
        <Col xs={24} md={12}>
          <Card title="Top Paying Clients" className='top-paying-clients'>
            <Table
              columns={columns}
              dataSource={clientsData}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      <AddScheduleForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default Dashboard;