import React, {useState} from 'react';
import { 
  Card, 
  Descriptions, 
  Timeline, 
  List, 
  Badge,
  Tabs,
  Button,
  Modal
} from 'antd';
import {
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import EditProfile from './EditProfile';

import './TabInfo.scss';

// https:grok.com/chat/a6a948f6-554e-4712-b6e9-8e7023d5434c

function TabInfo({ userInfo, orderHistory, vouchers, wishlist }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.auth);


  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };
  const handleDeleteItem = () => {
    // Logic xóa item (giả định gọi API)
    setIsDeleteModalVisible(false);
    // Thêm logic redirect hoặc logout sau khi xóa
  };
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };
  const handleLogoutAccount = () => {
    dispatch(logout());
    navigate('/login');
    setIsLogoutModalVisible(false);
  };
  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  return(
    <>
      <Tabs defaultActiveKey="1" centered className="profile-tabs">
        <Tabs.TabPane tab="Profile" key="1">
          <Card className="profile-card">
            <Descriptions title="Thông tin cơ bản" column={1} bordered>
              <Descriptions.Item label={<MailOutlined />}>
                {userInfo.email}
              </Descriptions.Item>
              <Descriptions.Item label={<PhoneOutlined />}>
                {userInfo.phone}
              </Descriptions.Item>
              <Descriptions.Item label={<HomeOutlined />}>
                {userInfo.address}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="History orders" key="2">
          <Card className="profile-card">
            <Timeline mode="left">
              {orderHistory.map((order) => (
                <Timeline.Item
                  key={order.id}
                  label={order.date}
                  color={order.status === 'Delivered' ? 'green' : 'blue'}
                >
                  <p>
                    <strong>{order.product}</strong> - {order.price.toLocaleString()} VNĐ
                  </p>
                  <p>Trạng thái: <Badge status={order.status === 'Delivered' ? 'success' : 'processing'} text={order.status} /></p>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Promotion" key="3">
          <Card className="profile-card">
            <List
              dataSource={vouchers}
              renderItem={(voucher) => (
                <List.Item>
                  <List.Item.Meta
                    title={voucher.name}
                    description={`Hết hạn: ${voucher.expiry}`}
                  />
                  <Button type="primary" onClick={() => navigate('/products')} >Sử dụng</Button>
                </List.Item>
              )}
            />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Wishlist" key="4">
          <Card className="profile-card">
            <List
              dataSource={wishlist}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover' }} />}
                    title={item.name}
                    description={`${item.price.toLocaleString()} VNĐ`}
                  />
                  <Button type="link" icon={<DeleteOutlined />} onClick={showDeleteModal} />
                </List.Item>
              )}
            />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Logout" key="5">
          <Card className="profile-card logout-card">
            <div className="logout-content">
              <LogoutOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />
              <h3>Bạn muốn đăng xuất?</h3>
              <p>Nhấn nút bên dưới để thoát khỏi tài khoản.</p>
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={showLogoutModal}
                size="large"
              >
                Đăng xuất
              </Button>
            </div>
          </Card>
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="Edit Profile" key="6">
          <EditProfile />
        </Tabs.TabPane >

      </Tabs>

      <Modal
        title="Confirm item deletion"
        visible={isDeleteModalVisible}
        onOk={handleDeleteItem}
        onCancel={handleCancelDelete}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this item? This action cannot be reversed!</p>
      </Modal>

      <Modal
        title="Confirm logout action"
        visible={isLogoutModalVisible}
        onOk={handleLogoutAccount}
        onCancel={handleCancelLogout}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out? This action cannot be reversed!</p>
      </Modal>
    </>
      
  );
}

export default TabInfo;