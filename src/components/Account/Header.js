import React from 'react';
import { 
  Card, 
  Avatar, 
  Button,
} from 'antd';
import {
  EditOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import './Header.scss';

function Header({ userInfo }) {
  return (
    <Card className="profile-header-card">
      <div className="profile-header">
        <Avatar src={userInfo.avatar} className="avatar" />
        <div className="header-info">
          <h1>{userInfo.fullName}</h1>
          <p className="member-since">
            Thành viên từ: {userInfo.memberSince}
          </p>
          <div className="stats">
            <div className="stat-item">
              <ShoppingCartOutlined />
              <span>{userInfo.orders} Đơn hàng</span>
            </div>
            <div className="stat-item">
              <GiftOutlined />
              <span>{userInfo.points} Điểm thưởng</span>
            </div>
          </div>
        </div>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => console.log('Chuyển hướng sang trang setting')}
          className="edit-btn"
        >
          Chỉnh sửa
        </Button>
      </div>
    </Card>
  )
}

export default Header;