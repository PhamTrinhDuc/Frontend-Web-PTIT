import React, { useState } from 'react';
import {
  Card,
  Descriptions,
  Timeline,
  List,
  Badge,
  Tabs,
  Button,
  Modal,
  Pagination,
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

function TabInfo({
  userInfo,
  orderHistory,
  vouchers,
  wishlist,
  currentPage,
  pageSize,
  setCurrentPage,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

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
    setIsLogoutModalVisible(false);
    setTimeout(() => {
      navigate('/login');
    }, 0);
  };
  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Tabs defaultActiveKey="1" centered className="profile-tabs">
        <Tabs.TabPane tab="Profile" key="1">
          <Card className="profile-card">
            <Descriptions title="Thông tin cơ bản" column={1} bordered>
              <Descriptions.Item label={<MailOutlined />}>
                {userInfo.email}
              </Descriptions.Item>
              <Descriptions.Item label={<PhoneOutlined />}>
                {userInfo.phoneNumber}
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
              {orderHistory.map((order, index) => (
                <Timeline.Item
                  key={`${order.date}-${index}`} // Đảm bảo key duy nhất
                  label={order.date}
                  color="green"
                >
                  <ul>
                    <li><strong>Product name:</strong> {order.product}</li>
                    <li><strong>Payment method:</strong> {order.paymentMethod}</li>
                    <li><strong>Total price:</strong> {order.price.toLocaleString()} VNĐ</li>
                    <li><strong>Quantity:</strong> {order.quantity}</li>
                    <li>
                      <strong>Status:</strong>{' '}
                      <Badge
                        status={
                          order.status === 'COMPLETED'
                            ? 'success'
                            : order.status === 'PENDING'
                            ? 'error'
                            : order.status === 'CANCELLED'
                            ? 'default'
                            : 'processing'
                        }
                        text={order.status}
                      />
                    </li>
                  </ul>
                </Timeline.Item>
              ))}
            </Timeline>
            {/* Component Pagination */}
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={orderHistory.length} // Cần cập nhật từ API nếu server-side
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
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
                  <Button type="primary" onClick={() => navigate('/products')}>
                    Sử dụng
                  </Button>
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
                    avatar={
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                      />
                    }
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
        </Tabs.TabPane>
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