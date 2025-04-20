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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { post } from '../../utils/requests';
import './ChangePassword.scss';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLoggedIn, user, token } = useSelector((state) => state.auth);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const onFinish = async (values) => {
    try {
      // Gọi API đổi mật khẩu
      const payload = {
        userId: user.id,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };

      const response = await post('users/change-password', payload, token);
      // Kiểm tra phản hồi từ server
      console.log('Response:', response);
      // navigate('/login');
      if (response) {
        message.success('Password updated successfully!');
      } else {
        message.error(response.data.message || 'Failed to update password');
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || 'An error occurred while updating password'
      );
    }
  };


  const handleCancel = () => {
    form.resetFields();
  };

  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleConfirmAccount = () => {
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
              <Button className="button-item" type="default" onClick={handleCancel}>
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