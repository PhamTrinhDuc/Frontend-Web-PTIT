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
  Divider,
} from 'antd';
import {
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import EditProfile from './EditProfile';
import './TabInfo.scss';
import { put } from '../../utils/requests';

function TabInfo({
  userInfo,
  orderHistory,
  currentPage,
  pageSize,
  setCurrentPage,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const showDeleteModal = useCallback((id) => {
    setSelectedOrderId(id);
    setIsDeleteModalVisible(true);
  }, []);

  const handleDeleteItem = useCallback(async () => {
    try {
      // Gọi API PUT để hủy đơn hàng
      const response = await put(`orders/cancel/${selectedOrderId}`);
      if (response?.status === 200) {
        // Nếu hủy thành công, đóng modal và reset selectedOrderId
        setIsDeleteModalVisible(false);
        setSelectedOrderId(null);
        console.log('Order cancelled successfully:', response.data);
      } else {
        // Nếu không thành công, log thông báo lỗi
        console.error('Failed to cancel order:', response?.data || response);
      }
    } catch (error) {
      // Xử lý lỗi nếu API call gặp sự cố
      console.error('Error cancelling order:', error);
    }
  }, [selectedOrderId]);

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
    }, 100);
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
                  key={`${order.id}-${index}`}
                  label={order.orderDate}
                  color="green"
                >
                  <div>
                    <ul>
                      {Array.isArray(order.items) && order.items.length > 0 ? (
                        order.items.map((item, itemIndex) => (
                          <li key={`${order.id}-item-${itemIndex}`}>
                            <strong>Product name:</strong> {item.productName} <br />
                            <strong>Price:</strong> {item.unitPrice.toLocaleString()} VNĐ <br />
                            <strong>Quantity:</strong> {item.quantity}
                            <hr></hr>
                          </li>
                        ))
                      ) : (
                        <li>No items in this order</li>
                      )}
                      <li><strong>Payment method:</strong> {order.paymentMethod}</li>
                      <li>
                        <strong>Total price:</strong>{' '}
                        {order.items
                          .reduce((total, item) => total + item.unitPrice * item.quantity, 0)
                          .toLocaleString()}{' '}
                        VNĐ
                      </li>
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
                      {(order.status === 'PENDING' || order.status === 'PROCESSING') && (
                        <li>
                          <Button
                            type="primary"
                            danger
                            size="small"
                            onClick={() => showDeleteModal(order.id)}
                            style={{ marginTop: '8px' }}
                          >
                            Cancel Order
                          </Button>
                        </li>
                      )}
                    </ul>
                    {index < orderHistory.length - 1 && <Divider />}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>

            {/* Component Pagination */}
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={orderHistory.length}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </Card>
        </Tabs.TabPane>

        {/* <Tabs.TabPane tab="Promotion" key="3">
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
        </Tabs.TabPane> */}

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
        title="Confirm item cancellation"
        visible={isDeleteModalVisible}
        onOk={handleDeleteItem}
        onCancel={handleCancelDelete}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to cancel this item? This action cannot be reversed!</p>
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