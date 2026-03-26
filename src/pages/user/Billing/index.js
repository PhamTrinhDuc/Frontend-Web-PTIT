import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Radio, message, Divider, Card, Space, Typography, Row, Col } from 'antd';
import { EnvironmentOutlined, ShopOutlined, CreditCardOutlined, MoneyCollectOutlined, QrcodeOutlined } from '@ant-design/icons';
import { post } from '../../../utils/requests';
import { clearCart } from '../../../slices/cartSlice';
import './Billing.scss';

const { Text, Title } = Typography;

function Billing() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { cartTotal, selectedItems } = location.state || { cartTotal: 0, selectedItems: [] };

  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    if (selectedItems.length === 0) {
      navigate('/cart');
    }
  }, [selectedItems, navigate]);

  const subtotal = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 0 : 0; // Customize business logic here
  const totalAmount = subtotal + shippingFee;

  const handlePlaceOrder = async (values) => {
    // Collect order data
    const orderDataResponse = {
      userId: user.id || 1, // Fallback for testing
      items: selectedItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount || 0
      })),
      paymentMethod: paymentMethod.toUpperCase(),
      shippingAddress: values.streetAddress, // Ideally sent to backend
      contactPhone: values.phoneNumber,
      contactName: values.fullName
    };

    if (paymentMethod === 'payos') {
      // TODO: Placeholder for PayOS Integration
      // 1. Call Backend to create PayOS payment link
      // 2. Redirect user to the PayOS checkout URL returned by backend
      message.loading('Redirecting to PayOS Checkout...', 2);
      // Example: 
      // const payOSResponse = await post('payments/payos/create', orderDataResponse, token);
      // window.location.href = payOSResponse.checkoutUrl;
      setTimeout(() => {
        message.info('PayOS placeholder triggered. Implement redirect here.');
      }, 2000);
      return; 
    }

    try {
      const response = await post('orders', orderDataResponse, token);
      if (response) {
        message.success('Order placed successfully!');
        dispatch(clearCart());
        navigate('/order-success');
      }
    } catch (error) {
      console.error("Error placing order:", error);
      message.error(error.message || 'Failed to place order');
    }
  };

  return (
    <div className="checkout-page">
      <Form
        form={form}
        name="checkout_form"
        onFinish={handlePlaceOrder}
        layout="vertical"
        initialValues={{
          fullName: user?.fullname || "",
          streetAddress: user?.address || "",
          phoneNumber: user?.phone || "0987654321"
        }}
      >
        {/* Delivery Address Section */}
        <Card className="checkout-card address-card" bordered={false}>
          <div className="card-header">
            <EnvironmentOutlined className="icon-location" />
            <Title level={4}>Delivery Address</Title>
          </div>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input placeholder="Recipient's Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input phone number!' }]}>
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="streetAddress" label="Detailed Address" rules={[{ required: true, message: 'Please input address!' }]}>
                <Input placeholder="House Number, Street, City" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Products Section */}
        <Card className="checkout-card products-card" bordered={false}>
          <div className="card-header">
            <ShopOutlined className="icon-shop" />
            <Title level={4}>Products Ordered</Title>
          </div>
          
          <div className="products-table-header">
            <Row>
              <Col span={10}>Product</Col>
              <Col span={4} className="text-center">Unit Price</Col>
              <Col span={4} className="text-center">Amount</Col>
              <Col span={6} className="text-right">Item Subtotal</Col>
            </Row>
          </div>

          <div className="products-list">
            {selectedItems.map((item) => (
              <Row key={item.id} className="product-item" align="middle">
                <Col span={10}>
                  <Space>
                    <img src={item.imagePaths?.[0]} alt={item.name} className="product-img" />
                    <Text className="product-name">{item.name}</Text>
                  </Space>
                </Col>
                <Col span={4} className="text-center">
                  <Text>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</Text>
                </Col>
                <Col span={4} className="text-center">
                  <Text>{item.quantity}</Text>
                </Col>
                <Col span={6} className="text-right">
                  <Text strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</Text>
                </Col>
              </Row>
            ))}
          </div>
          
          <div className="shipping-option">
            <Row justify="space-between" align="middle">
              <Col><Text strong>Shipping Option:</Text> Standard Delivery</Col>
              <Col><Text strong>{shippingFee === 0 ? 'Free Shipping' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee)}</Text></Col>
            </Row>
          </div>
        </Card>

        {/* Payment Method Section */}
        <Card className="checkout-card payment-card" bordered={false}>
          <div className="card-header">
            <Title level={4}>Payment Method</Title>
          </div>
          <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} className="payment-radio-group">
            <Space size="large" wrap>
              <Radio.Button value="cod" className={`payment-btn ${paymentMethod === 'cod' ? 'active' : ''}`}>
                <MoneyCollectOutlined /> Cash on Delivery
              </Radio.Button>
              <Radio.Button value="payos" className={`payment-btn ${paymentMethod === 'payos' ? 'active' : ''}`}>
                <QrcodeOutlined /> PayOS (QR Code)
              </Radio.Button>
              <Radio.Button value="vnpay" className={`payment-btn ${paymentMethod === 'vnpay' ? 'active' : ''}`}>
                <CreditCardOutlined /> VNPAY
              </Radio.Button>
            </Space>
          </Radio.Group>
        </Card>

        {/* Order Summary & Submit section */}
        <div className="checkout-footer">
          <div className="summary-section">
            <Row justify="end" className="summary-row">
              <Col span={4} className="text-right">Merchandise Subtotal:</Col>
              <Col span={4} className="text-right">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</Col>
            </Row>
            <Row justify="end" className="summary-row">
              <Col span={4} className="text-right">Shipping Total:</Col>
              <Col span={4} className="text-right">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee)}</Col>
            </Row>
            <Row justify="end" className="summary-row final-total">
              <Col span={4} className="text-right">Total Payment:</Col>
              <Col span={4} className="text-right total-amount">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</Col>
            </Row>
          </div>
          <Divider style={{ margin: '16px 0' }} />
          <Row justify="end" align="middle">
            <Space size="large">
              <Text type="secondary">By clicking "Place Order", you agree to our Terms & Conditions.</Text>
              <Button type="primary" size="large" htmlType="submit" className="place-order-btn">
                Place Order
              </Button>
            </Space>
          </Row>
        </div>
      </Form>
    </div>
  );
}

export default Billing;