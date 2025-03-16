import React from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import './AddScheduleForm.scss';


const AddScheduleForm = ({ visible, onCancel, onAdd }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const scheduleData = {
      title: values.title,
      start_time: values.start_time.format('YYYY-MM-DD HH:mm:ss'),
      description: values.description,
      created_by: 1, // Giả sử admin có ID là 1
    };

    fetch('http://localhost:5000/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scheduleData),
    })
      .then(res => res.json())
      .then(() => {
        onAdd(); // Gọi callback để refresh danh sách
        form.resetFields(); // Reset form
      })
      .catch(err => console.error(err));
  };

  return (
    <Modal
      title="Add New Schedule"
      visible={visible}
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
        </Form.Item>
        <Form.Item
          name="start_time"
          label="Start Time"
          rules={[{ required: true, message: 'Please select a time' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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