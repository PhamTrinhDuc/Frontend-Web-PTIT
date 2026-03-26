import React, { useState, useRef, useCallback, useEffect} from 'react';
import {
  Card,
  Descriptions,
  Timeline,
  Badge,
  Tabs,
  Button,
  Modal,
  Pagination,
  Divider,
  message,
} from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import EditProfile from './EditProfile';
import { clearCart } from '../../slices/cartSlice';
import './TabInfo.scss';
import { put } from '../../utils/requests';

// Helper function to safely dispatch multiple actions
const safeDispatch = (dispatch, actions) => {
  try {
    actions.forEach(action => {
      if (typeof action === 'function') {
        dispatch(action());
      } else {
        dispatch(action);
      }
    });
    return true;
  } catch (error) {
    console.error("Error dispatching actions:", error);
    return false;
  }
};

function TabInfo({
  userInfo,
  orderHistory,
  currentPage,
  pageSize,
  setCurrentPage,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const showDeleteModal = useCallback((id) => {
    setSelectedOrderId(id);
    setIsDeleteModalVisible(true);
  }, []);

  const handleDeleteItem = useCallback(async () => {
    try {
      // Gọi API PUT để hủy đơn hàng
      const response = await put(`orders/cancel/${selectedOrderId}`, null, token);
      console.log('response', response);
      
      // Check if component is still mounted before updating state
      if (!isMounted.current) return;
      
      if (response.status) {
        // Nếu hủy thành công, đóng modal và reset selectedOrderId
        setIsDeleteModalVisible(false);
        setSelectedOrderId(null);
        console.log('Order cancelled successfully:', response.data);
      } else {
        // Nếu không thành công, log thông báo lỗi
        console.error('Failed to cancel order:', response?.data || response);
      }
    } catch (error) {
      // Check if component is still mounted before showing error
      if (isMounted.current) {
        message.error('Error cancelling order');
      }
      // Xử lý lỗi nếu API call gặp sự cố
      console.error('Error cancelling order:', error);
    }
  }, [selectedOrderId, token]);

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };  

  const handleLogoutAccount = useCallback(() => {
    // Close the modal
    setIsLogoutModalVisible(false);
    
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Dispatch logout actions and navigate
    dispatch(logout());
    dispatch(clearCart());
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);

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
                            {order.status === 'COMPLETED' && (
                              <div style={{ marginTop: '5px' }}>
                                <Button 
                                  size="small" 
                                  type="link" 
                                  onClick={() => navigate(`/product-detail/${item.productId}`)}
                                  className="pink-link"
                                  style={{ padding: 0 }}
                                >
                                  Rating & Review
                                </Button>
                              </div>
                            )}
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
        open={isDeleteModalVisible}
        onOk={handleDeleteItem}
        onCancel={handleCancelDelete}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to cancel this item? This action cannot be reversed!</p>
      </Modal>
      <Modal
        title="Confirm logout action"
        open={isLogoutModalVisible}
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