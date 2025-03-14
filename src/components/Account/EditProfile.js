import React, { useState, useContext } from 'react';
import { 
  Card, 
  Form, 
  Divider,
  Input, 
  Button, 
  Modal, 
  message,
} from 'antd';
// import { UserContext } from '../context/UserContext';
import { DeleteOutlined } from '@ant-design/icons';
import './EditProfile.scss';

const EditProfile = () => {
  const { userInfo, setUserInfo } = useContext();
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const initialValues = {
    firstName: userInfo.fullName.split(' ')[0] || '',
    lastName: userInfo.fullName.split(' ').slice(1).join(' ') || '',
    email: userInfo.email,
    address: userInfo.address,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const onFinish = (values) => {
    // Logic kiểm tra mật khẩu hiện tại (giả định API hoặc state lưu mật khẩu)
    if (values.currentPassword !== 'password123') { // Thay bằng logic kiểm tra thực tế
      message.error('Mật khẩu hiện tại không đúng!');
      return;
    }

    // Cập nhật thông tin người dùng
    setUserInfo({
      ...userInfo,
      fullName: `${values.firstName} ${values.lastName}`.trim(),
      email: values.email,
      address: values.address,
    });

    // Nếu có mật khẩu mới và khớp
    if (values.newPassword && values.newPassword === values.confirmPassword) {
      // Logic lưu mật khẩu mới (giả định gọi API)
      console.log('Cập nhật mật khẩu:', values.newPassword);
    } else if (values.newPassword || values.confirmPassword) {
      message.error('Mật khẩu mới và xác nhận không khớp!');
      return;
    }

    message.success('Cập nhật thông tin thành công!');
    form.resetFields(['currentPassword', 'newPassword', 'confirmPassword']);
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteAccount = () => {
    // Logic xóa tài khoản (giả định gọi API)
    console.log('Xóa tài khoản');
    setIsDeleteModalVisible(false);
    message.success('Tài khoản đã được xóa!');
    // Thêm logic redirect hoặc logout sau khi xóa
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="edit-profile-container">
      <Card title="Edit Your Profile">
        <Form
          form={form}
          name="edit-profile"
          onFinish={onFinish}
          initialValues={initialValues}
          layout="vertical"
        >
          <div className="form-row">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input placeholder="Phạm Trịnh" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
            >
              <Input placeholder="Đức" />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}
            >
              <Input placeholder="rimell11@gmail.com" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
              <Input placeholder="Kingston, 5236, United State" />
            </Form.Item>
          </div>

          <Divider>Password Changes</Divider>

          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
          >
            <Input.Password placeholder="Current Password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            rules={[{ message: 'Vui lòng xác nhận mật khẩu mới!' }]}
          >
            <Input.Password placeholder="Confirm New Password" />
          </Form.Item>

          <Form.Item>
            <div className="button-group">
              <Button type="default" onClick={() => form.resetFields()}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>

      <Button
        type="danger"
        icon={<DeleteOutlined />}
        className="delete-account-btn"
        onClick={showDeleteModal}
      >
        Delete Account
      </Button>

      <Modal
        title="Xác nhận xóa tài khoản"
        visible={isDeleteModalVisible}
        onOk={handleDeleteAccount}
        onCancel={handleCancelDelete}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc muốn xóa tài khoản? Hành động này không thể hoàn tác!</p>
      </Modal>
    </div>
  );
};

export default EditProfile;