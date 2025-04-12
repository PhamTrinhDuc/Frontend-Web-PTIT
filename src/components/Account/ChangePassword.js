import React, { useState } from 'react';
import {
  Card,
  Form,
  Divider,
  Input,
  Button,
  Modal,
  message,
} from 'antd';
import './ChangePassword.scss';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const onFinish = (values) => {
    if (values.currentPassword !== 'password123') {
      message.error('Current password is incorrect!');
      return;
    }

    if (values.newPassword && values.newPassword === values.confirmPassword) {
      console.log('Update password:', values.newPassword);
    } else {
      message.error('New password and confirmation do not match!');
      return;
    }

    message.success('Password updated successfully!');
    form.resetFields();
  };

  const showCancelModal = () => {
    setIsCancelModalVisible(true);
  };

  const handleCancelAccount = () => {
    console.log('Cancel password change');
    setIsCancelModalVisible(false);
    message.success('Password change canceled!');
    form.resetFields();
  };

  const handleCancelCancel = () => {
    setIsCancelModalVisible(false);
  };

  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleConfirmAccount = () => {
    console.log('Confirm password change');
    form.submit();
    setIsConfirmModalVisible(false);
  };

  const handleCancelConfirm = () => {
    setIsConfirmModalVisible(false);
  };

  return (
    <div className="change-password-container">
      <Card className="form-card">
        <Divider className="form-title">Change Your Password</Divider>
        <Form
          form={form}
          name="change-password"
          onFinish={onFinish}
          layout="vertical"
        >
          <div className="form-change">
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[{ required: true, message: 'Please enter current password!' }]}
            >
              <Input.Password placeholder="Current Password" className="form-input" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[{ required: true, message: 'Please enter new password!' }]}
            >
              <Input.Password placeholder="New Password" className="form-input" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              rules={[{ required: true, message: 'Please confirm new password!' }]}
            >
              <Input.Password placeholder="Confirm New Password" className="form-input" />
            </Form.Item>
          </div>
          <Form.Item>
            <div className="button-group">
              <Button className="button-item" type="default" onClick={showCancelModal}>
                Cancel
              </Button>
              <Button
                className="button-item"
                type="primary"
                onClick={showConfirmModal}
              >
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="Cancel password change"
        visible={isCancelModalVisible}
        onOk={handleCancelAccount}
        onCancel={handleCancelCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to cancel the password change? This cannot be undone!</p>
      </Modal>
      <Modal
        title="Confirm password change"
        visible={isConfirmModalVisible}
        onOk={handleConfirmAccount}
        onCancel={handleCancelConfirm}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to change your password? This cannot be undone!</p>
      </Modal>
    </div>
  );
};

export default ChangePassword;