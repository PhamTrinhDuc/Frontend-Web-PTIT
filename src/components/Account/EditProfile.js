import React, { useState } from 'react';
import {
  Card,
  Form,
  Divider,
  Input,
  Button,
  Modal,
  message,
  Alert,
  Upload,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ChangePassword from './ChangePassword';
import { post } from '../../utils/requests';
import { setCredentials } from '../../slices/authSlice';
import './EditProfile.scss';

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, user, token } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [uploading, setUploading] = useState(false);
  
  const initialValues = {
    firstName: user?.fullname?.split(' ')[0] || '',
    lastName: user?.fullname?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    address: user?.address || '',
    phone: user?.phoneNumber || '',
    gender: user?.gender || '',
  };

  const handleSave = async (values) => {
    try {
      const payload = {
        id: user.id,
        fullName: `${values.firstName} ${values.lastName}`.trim() || null,
        email: values.email || null,
        address: values.address || null,
        phoneNumber: values.phone || null,
        gender: values.gender || null,
        avatar: avatarUrl || null,
      };

      console.log('Payload:', payload);

      const response = await post('users/me/profile', payload, token);

      if (!response) {
        throw new Error("Update failed, no response.");
      }

      // Update Redux state with new user info so Header reflects it
      dispatch(setCredentials({ user: response, token }));
      
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1500);
      message.success("Profile updated successfully");
    } catch (error) {
      console.error('Lỗi cập nhật:', error.message);
      message.error(error.message);
    }
  };

  const uploadAvatar = async (options) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try {
      const res = await fetch('http://localhost:8080/api/upload/image', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        const result = await res.json();
        setAvatarUrl(result.data);
        onSuccess("Ok");
        message.success("Avatar uploaded successfully!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      onError(err);
      message.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage hoặc Redux
  
      const response = await fetch('http://localhost:8080/api/users/me', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response) {
        const errorText = await response.text();
        throw new Error(`Xoá thất bại: ${errorText}`);
      }
  
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Lỗi xoá tài khoản:', error.message);
      message.error(error.message);
    } finally {
      setIsDeleteModalVisible(false);
    }
  };
  const handleCancel = () => {
    form.resetFields();
  }
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <>
    {showAlert && (
        <Alert
          message={'Updated profile sucessfull !'}
          type="success"
          showIcon
          className="cart-alert"
        />
      )}
      <div className="edit-profile-container">
        <Card className="form-card">
          <Divider className="form-title">Edit Your Profile</Divider>
          
          <div className="avatar-upload-section" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={uploadAvatar}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                <div>
                  {uploading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </div>

          <Form
            form={form}
            name="edit-profile"
            onFinish={handleSave}
            initialValues={initialValues}
            layout="vertical"
          >
            <div className="form-row">
              <Form.Item
                name="firstName"
                label="First Name"
                className="form-item"
                rules={[{message: 'Please enter name!' }]}
              >
                <Input className="form-input" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                className="form-item"
                rules={[{message: 'Please enter your last name!' }]}
              >
                <Input className="form-input" />
              </Form.Item>
            </div>
            <div className="form-row">
              <Form.Item
                name="email"
                label="Email"
                className="form-item"
                rules={[{type: 'email', message: 'Invalid email!' }]}
              >
                <Input className="form-input" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                className="form-item"
                rules={[{message: 'Please enter address!' }]}
              >
                <Input className="form-input" />
              </Form.Item>
            </div>
            <div className="form-row">
              <Form.Item
                name="phone"
                label="Phone Number"
                className="form-item"
                rules={[{message: 'Please enter phone number!' }]}
              >
                <Input className="form-input" />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                className="form-item"
                rules={[{message: 'Please enter gender!' }]}
              >
                <Input className="form-input" />
              </Form.Item>
            </div>
            <Form.Item>
              <div className="button-group">
                <Button className="button-item" type="default" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button className="button-item" type="primary" htmlType="submit" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>

        <ChangePassword />

        <Button
          type="danger"
          icon={<DeleteOutlined />}
          className="delete-account-btn"
          onClick={showDeleteModal}
        >
          Delete Account
        </Button>

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
    </>
  );
};

export default EditProfile;