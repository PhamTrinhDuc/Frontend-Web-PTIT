import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './AdminButton.scss';

const FloatingAdminButton = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || 'user'; // Lấy role từ Redux, mặc định là 'user' nếu không có
  const navigate = useNavigate();

  // Nếu không phải admin, không hiển thị nút
  if (role !== 'admin') return null;

  // Điều hướng đến trang admin khi nhấn nút
  const handleGoToAdmin = () => {
    navigate('/admin'); // Điều hướng đến /admin (sẽ tự động redirect sang /admin/dashboard)
  };

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<SettingOutlined />}
      size="large"
      className="floating-admin-button"
      onClick={handleGoToAdmin}
      title="Go to Admin Panel"
    />
  );
};

export default FloatingAdminButton;