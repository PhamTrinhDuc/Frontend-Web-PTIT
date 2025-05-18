import React from 'react';
import { Modal, Form, Input, Button, DatePicker, message } from 'antd';
import { getAllSchedules } from '../../../utils/scheduleUtils';
import './AddScheduleForm.scss';

// Helper function to save schedules to localStorage
const saveScheduleToLocalStorage = (schedule) => {
  try {
    // Get existing schedules from localStorage
    const existingSchedules = getAllSchedules();
    
    // Add the new schedule with a unique ID
    const newSchedule = {
      ...schedule,
      id: Date.now(), // Use timestamp as a simple unique ID
      created_at: new Date().toISOString()
    };
    
    // Save the updated schedules array
    localStorage.setItem('schedules', JSON.stringify([...existingSchedules, newSchedule]));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

const AddScheduleForm = ({ open, onCancel, onAdd }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {    
    // Make sure we have a future date
    const selectedDateTime = values.start_time;
    const now = new Date();
    
    if (selectedDateTime.valueOf() <= now.valueOf()) {
      message.warning('Please select a future date and time');
      return;
    }
    
    const scheduleData = {
      title: values.title,
      start_time: values.start_time.format('YYYY-MM-DD HH:mm:ss'),
      description: values.description,
      created_by: 1, // Giả sử admin có ID là 1
    };

    console.log('Saving schedule data:', scheduleData);
    
    // Save to localStorage instead of API call
    const saved = saveScheduleToLocalStorage(scheduleData);
    
    if (saved) {
      console.log('Schedule saved successfully');
      message.success('Schedule added successfully');
      onAdd(); // Gọi callback để refresh danh sách
      form.resetFields(); // Reset form
    } else {
      console.error('Failed to save schedule');
      message.error('Failed to add schedule');
    }};
  return (
    <Modal
      title="Add New Schedule"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter meeting title" />
        </Form.Item>        <Form.Item
          name="start_time"
          label="Start Time"
          rules={[{ required: true, message: 'Please select a time' }]}
        >
          <DatePicker 
            showTime 
            format="YYYY-MM-DD HH:mm:ss" 
            disabledDate={(current) => current && current < Date.now()}
            placeholder="Select date and time"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter description (optional)" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Add Schedule
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddScheduleForm;