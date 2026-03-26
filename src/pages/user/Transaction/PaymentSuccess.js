import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { ShoppingCartOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './PaymentSuccess.scss';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success-container">
      <Result
        status="success"
        icon={<CheckCircleOutlined className="success-icon" />}
        title="Thanh toán thành công!"
        subTitle="Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ giao hàng trong thời gian sớm nhất."
        extra={[
          <Button 
            type="primary" 
            key="home"
            size="large"
            onClick={() => navigate('/')}
          >
            Về trang chủ
          </Button>,
          <Button 
            key="orders"
            size="large"
            onClick={() => navigate('/account')}
            icon={<ShoppingCartOutlined />}
          >
            Xem đơn hàng
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
