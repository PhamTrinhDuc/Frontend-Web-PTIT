import React from 'react';
import { List, Card, Button, Empty, Spin, Typography, Badge, Popconfirm } from 'antd';
import { DeleteOutlined, ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import useSchedules from '../../hook/useSchedules';
import { deleteSchedule } from '../../utils/scheduleUtils';
import './ScheduleList.scss';

const { Title, Text } = Typography;

const ScheduleList = () => {
  const { schedules, loading, error, refreshSchedules } = useSchedules(true); // Get only active schedules

  const handleDelete = (id) => {
    const success = deleteSchedule(id);
    if (success) {
      refreshSchedules();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="schedule-loading"><Spin size="large" /></div>;
  }

  if (error) {
    return <div className="schedule-error">{error}</div>;
  }

  return (
    <div className="schedule-list">
      <div className="schedule-list-header">
        <Title level={3}>Upcoming Schedules</Title>
        <Badge count={schedules.length} />
      </div>
      
      {schedules.length === 0 ? (
        <Empty description="No upcoming schedules" />
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
          dataSource={schedules}
          renderItem={(item) => (
            <List.Item>
              <Card 
                title={item.title}
                extra={
                  <Popconfirm
                    title="Are you sure you want to delete this schedule?"
                    onConfirm={() => handleDelete(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="text" danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                }
                className="schedule-card"
              >
                <p><ClockCircleOutlined /> <Text strong>Start Time:</Text> {formatDate(item.start_time)}</p>
                <p><CalendarOutlined /> <Text strong>Description:</Text> {item.description || 'No description'}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ScheduleList;
