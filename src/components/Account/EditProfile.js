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
import { DeleteOutlined } from '@ant-design/icons';
import './EditProfile.scss';

const EditProfile = () => {
  const UserContext = React.createContext({
    userInfo: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
    },
    setUserInfo: () => {},
  });

  const { userInfo, setUserInfo } = useContext(UserContext);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);


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

  const showCancelModal = () => {
    setIsCancelModalVisible(true);
  };
  const handleCancelAccount = () => {
    // Logic hủy bỏ thay đổi (giả định gọi API)
    console.log('Hủy bỏ thay đổi');
    setIsCancelModalVisible(false);
    message.success('Thay đổi đã được hủy bỏ!');
    // Thêm logic reset form hoặc các hành động khác sau khi hủy bỏ
  };
  const handleCancelCancel = () => {
    setIsCancelModalVisible(false);
  };


  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };
  const hanleConfirmAccount = () => {
    // Logic xác nhận tài khoản (giả định gọi API)
    console.log('Xác nhận tài khoản');
    setIsConfirmModalVisible(false);
    message.success('Tài khoản đã được xác nhận!');
    // Thêm logic redirect hoặc logout sau khi xác nhận
  };
  const handleCancelConfirm = () => {
    setIsConfirmModalVisible(false);
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
      <Card className='form-card' >
      <Divider className='form-title'>Edit your profile</Divider>

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
              className='form-item'
              rules={[{ required: true, message: 'Please enter name!' }]}
            >
              <Input placeholder="Phạm Trịnh" className='form-input' />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Last Name"
              className='form-item'
              rules={[{ required: true, message: 'Please enter your last name!' }]}
            >
              <Input placeholder="Đức"  className='form-input'/>
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              name="email"
              label="Email"
              className='form-item'
              rules={[{ required: true, type: 'email', message: 'Invalid email!' }]}
            >
              <Input placeholder="rimell11@gmail.com" className='form-input'/>
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              className='form-item'
              rules={[{ required: true, message: 'Please enter address!' }]}
            >
              <Input placeholder="Kingston, 5236, United State" className='form-input'/>
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              name="phone"
              label="Phone Number"
              className='form-item'
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder="0123456789" className='form-input'/>
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              className='form-item'
              rules={[{ required: true, message: 'Please enter gender!' }]}
            >
              <Input placeholder="Kingston, 5236, United State" className='form-input'/>
            </Form.Item>
          </div>

          <Divider className='form-title'>Password Changes</Divider>
          <div className='form-change'>
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[{ required: true, message: 'Please enter current password!' }]}
            >
              <Input.Password placeholder="Current Password" className='form-input' />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[{ required: true, message: 'Please enter new password!' }]}
            >
              <Input.Password placeholder="New Password" className='form-input' />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              rules={[{ required:true, message: 'Please confirm new password!' }]}
            >
              <Input.Password placeholder="Confirm New Password" className='form-input' />
            </Form.Item>
          </div>

          <Form.Item>

            <div className="button-group">
              <Button className='button-item' type="default" onClick={showCancelModal}>
                Cancel
              </Button>
              <Button className='button-item' type="primary" htmlType="submit" onClick={showConfirmModal}>
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
        title="Cancel information change"
        visible={isCancelModalVisible}
        onOk={handleCancelAccount}
        onCancel={handleCancelCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to cancel the changes? This cannot be undone!</p>
      </Modal>

      <Modal
        title="Confirm information change"
        visible={isConfirmModalVisible}
        onOk={hanleConfirmAccount}
        onCancel={handleCancelConfirm}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure with the information changed? This cannot be undone!</p>
      </Modal>

      <Modal
        title="Confirm account deletion"
        visible={isDeleteModalVisible}
        onOk={handleDeleteAccount}
        onCancel={handleCancelDelete}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete your account? This action cannot be undone!</p>
      </Modal>
    </div>
  );
};

export default EditProfile;