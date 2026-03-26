import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Card, 
  Form, 
  Input, 
  Select, 
  Button, 
  Spin, 
  Alert, 
  Modal,
  Descriptions,
  Result
} from 'antd';
import { 
  CreditCardOutlined, 
  WalletOutlined, 
  BankOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import paymentService from '../../../services/paymentService';
import './Transaction.scss';

const { Option } = Select;

const Transaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  
  const { token, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Lấy thông tin từ route state (từ trang Cart hoặc Checkout)
  const orderData = location.state?.orderData || null;
  const totalAmount = location.state?.totalAmount || 0;

  useEffect(() => {
    // Kiểm tra nếu không có token thì redirect về login
    if (!token) {
      navigate('/login', { state: { from: '/transaction' } });
      return;
    }

    // Kiểm tra xem có params confirm payment không (callback từ payment gateway)
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get('paymentId');
    const paymentToken = searchParams.get('token');
    
    if (paymentId && paymentToken) {
      handleConfirmPayment(paymentId, paymentToken);
    }
  }, [token, navigate, location.search]);

  /**
   * Xử lý tạo giao dịch thanh toán
   */
  const handleCreatePayment = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const paymentData = {
        amount: values.amount || totalAmount.toString(),
        currency: values.currency || 'VND',
        description: values.description || `Thanh toán đơn hàng - ${user?.email}`,
        paymentMethod: values.paymentMethod,
      };

      const response = await paymentService.createPayment(paymentData, token);
      
      // Kiểm tra response
      if (response.success && response.paymentUrl) {
        // Redirect đến trang thanh toán của bên thứ 3
        window.location.href = response.paymentUrl;
      } else if (response.paymentId) {
        // Nếu không có URL, hiển thị thông tin payment
        Modal.info({
          title: 'Giao dịch đã được tạo',
          content: (
            <div>
              <p>Mã giao dịch: {response.paymentId}</p>
              <p>Vui lòng hoàn tất thanh toán</p>
            </div>
          ),
        });
      } else {
        setPaymentResult({
          success: true,
          message: 'Tạo giao dịch thành công',
          data: response
        });
      }
    } catch (err) {
      setError(err.message || 'Không thể tạo giao dịch. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Xử lý xác nhận thanh toán (callback từ payment gateway)
   */
  const handleConfirmPayment = async (paymentId, paymentToken) => {
    setConfirmLoading(true);
    setError(null);

    try {
      const response = await paymentService.confirmPayment(
        paymentId, 
        paymentToken, 
        token
      );
      
      setPaymentResult({
        success: true,
        message: 'Thanh toán thành công!',
        data: response
      });

      // Tự động redirect về trang success sau 3 giây
      setTimeout(() => {
        navigate('/success-order', { 
          state: { 
            paymentData: response,
            orderId: response.orderId 
          } 
        });
      }, 3000);
    } catch (err) {
      setPaymentResult({
        success: false,
        message: err.message || 'Xác nhận thanh toán thất bại',
        data: null
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  /**
   * Render form thanh toán
   */
  const renderPaymentForm = () => (
    <Card 
      title={
        <div className="payment-header">
          <CreditCardOutlined /> Thông tin thanh toán
        </div>
      }
      className="payment-card"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreatePayment}
        initialValues={{
          amount: totalAmount,
          currency: 'VND',
        }}
      >
        <Form.Item
          label="Số tiền"
          name="amount"
          rules={[
            { required: true, message: 'Vui lòng nhập số tiền' },
            { 
              pattern: /^[0-9]+$/, 
              message: 'Số tiền không hợp lệ' 
            }
          ]}
        >
          <Input 
            prefix="₫" 
            placeholder="Nhập số tiền"
            size="large"
            disabled={totalAmount > 0}
          />
        </Form.Item>

        <Form.Item
          label="Loại tiền tệ"
          name="currency"
          rules={[{ required: true, message: 'Vui lòng chọn loại tiền tệ' }]}
        >
          <Select size="large" placeholder="Chọn loại tiền tệ">
            <Option value="VND">VND - Việt Nam Đồng</Option>
            <Option value="USD">USD - US Dollar</Option>
            <Option value="EUR">EUR - Euro</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Phương thức thanh toán"
          name="paymentMethod"
          rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
        >
          <Select size="large" placeholder="Chọn phương thức thanh toán">
            <Option value="VNPAY">
              <WalletOutlined /> VNPay
            </Option>
            <Option value="MOMO">
              <WalletOutlined /> MoMo
            </Option>
            <Option value="ZALOPAY">
              <WalletOutlined /> ZaloPay
            </Option>
            <Option value="BANK_TRANSFER">
              <BankOutlined /> Chuyển khoản ngân hàng
            </Option>
            <Option value="CREDIT_CARD">
              <CreditCardOutlined /> Thẻ tín dụng/Ghi nợ
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả giao dịch"
          name="description"
        >
          <Input.TextArea 
            rows={3} 
            placeholder="Nhập mô tả cho giao dịch (tùy chọn)"
          />
        </Form.Item>

        {orderData && (
          <Descriptions title="Thông tin đơn hàng" bordered size="small" className="order-info">
            <Descriptions.Item label="Tổng tiền" span={3}>
              {totalAmount.toLocaleString('vi-VN')} ₫
            </Descriptions.Item>
            <Descriptions.Item label="Số sản phẩm" span={3}>
              {cartItems?.length || 0}
            </Descriptions.Item>
          </Descriptions>
        )}

        {error && (
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large"
            loading={loading}
            block
            icon={<CreditCardOutlined />}
          >
            Thanh toán
          </Button>
        </Form.Item>

        <Form.Item>
          <Button 
            size="large"
            block
            onClick={() => navigate('/cart')}
          >
            Quay lại giỏ hàng
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  /**
   * Render kết quả thanh toán
   */
  const renderPaymentResult = () => (
    <Result
      status={paymentResult.success ? "success" : "error"}
      title={paymentResult.success ? "Thanh toán thành công!" : "Thanh toán thất bại"}
      subTitle={paymentResult.message}
      icon={paymentResult.success ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
      extra={[
        <Button 
          type="primary" 
          key="home"
          onClick={() => navigate('/')}
        >
          Về trang chủ
        </Button>,
        paymentResult.success && (
          <Button 
            key="orders"
            onClick={() => navigate('/account')}
          >
            Xem đơn hàng
          </Button>
        ),
        !paymentResult.success && (
          <Button 
            key="retry"
            onClick={() => {
              setPaymentResult(null);
              setError(null);
            }}
          >
            Thử lại
          </Button>
        ),
      ]}
    >
      {paymentResult.data && (
        <div className="payment-details">
          <Descriptions bordered size="small">
            {paymentResult.data.paymentId && (
              <Descriptions.Item label="Mã giao dịch" span={3}>
                {paymentResult.data.paymentId}
              </Descriptions.Item>
            )}
            {paymentResult.data.orderId && (
              <Descriptions.Item label="Mã đơn hàng" span={3}>
                {paymentResult.data.orderId}
              </Descriptions.Item>
            )}
            {paymentResult.data.amount && (
              <Descriptions.Item label="Số tiền" span={3}>
                {parseInt(paymentResult.data.amount).toLocaleString('vi-VN')} ₫
              </Descriptions.Item>
            )}
          </Descriptions>
        </div>
      )}
    </Result>
  );

  /**
   * Render loading khi đang xác nhận thanh toán
   */
  if (confirmLoading) {
    return (
      <div className="transaction-container">
        <Card className="loading-card">
          <Spin size="large" />
          <p style={{ marginTop: 16, textAlign: 'center' }}>
            Đang xác nhận thanh toán...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="transaction-container">
      <div className="transaction-content">
        {paymentResult ? renderPaymentResult() : renderPaymentForm()}
      </div>
    </div>
  );
};

export default Transaction;
