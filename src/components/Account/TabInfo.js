import React from 'react';
import { 
  Card, 
  Descriptions, 
  Timeline, 
  List, 
  Badge,
  Tabs,
  Button,
} from 'antd';
import {
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './TabInfo.scss';

// https:grok.com/chat/a6a948f6-554e-4712-b6e9-8e7023d5434c

function TabInfo({ userInfo, orderHistory, vouchers, wishlist, handleLogout, handleDeleteItem }) {
  return(
    <Tabs defaultActiveKey="1" centered className="profile-tabs">
        <Tabs.TabPane tab="Thông tin cá nhân" key="1">
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

        <Tabs.TabPane tab="Lịch sử mua sắm" key="2">
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

        <Tabs.TabPane tab="Ưu đãi" key="3">
          <Card className="profile-card">
            <List
              dataSource={vouchers}
              renderItem={(voucher) => (
                <List.Item>
                  <List.Item.Meta
                    title={voucher.name}
                    description={`Hết hạn: ${voucher.expiry}`}
                  />
                  <Button type="primary">Sử dụng</Button>
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
                  <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDeleteItem(item.id)} />
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
                onClick={handleLogout}
                size="large"
              >
                Đăng xuất
              </Button>
            </div>
          </Card>
        </Tabs.TabPane>
      </Tabs>
  )
}

export default TabInfo;