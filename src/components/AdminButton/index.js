import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './AdminButton.scss';

const AdminButton = () => {
  const navigate = useNavigate();
  // Điều hướng đến trang admin khi nhấn nút
  const handleGoToAdmin = () => {
    navigate('/admin'); // Điều hướng đến /admin (sẽ tự động redirect sang /admin/dashboard)
  };

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<MdAdminPanelSettings />}
      size="large"
      className="floating-admin-button"
      onClick={handleGoToAdmin}
      title="Go to Admin Panel"
    />
  );
};

export default AdminButton;