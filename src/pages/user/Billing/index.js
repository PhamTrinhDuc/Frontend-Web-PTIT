import { useState } from 'react';
import { Button, Form, Input, Checkbox, Radio, message } from 'antd';
import './Billing.scss';


function BillingForm({ onSave }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Billing Details:', values);
    onSave(values); // Gửi thông tin người dùng lên component cha
  };

  return (
    <>
      <div className="billing-form">
      <h2>Billing Details</h2>
      <Form
        form={form}
        name="billing_form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="firstName"
          label="First Name*"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="companyName" label="Company Name">
          <Input />
        </Form.Item>

        <Form.Item
          name="streetAddress"
          label="Street Address*"
          rules={[{ required: true, message: 'Please input your street address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="apartment" label="Apartment, floor, etc. (optional)">
          <Input />
        </Form.Item>

        <Form.Item
          name="townCity"
          label="Town/City"
          rules={[{ required: true, message: 'Please input your town/city!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number*"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="emailAddress"
          label="Email Address*"
          rules={[{ required: true, message: 'Please input your email address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="saveInfo" valuePropName="checked">
          <Checkbox onChange={(e) => console.log('Save info:', e.target.checked)}>
            Save this information for faster check-out next time
          </Checkbox>
        </Form.Item>
      </Form>
    </div>
    </>
  )
}


const OrderSummary = ({ cartItems, onPlaceOrder }) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (couponCode === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1);
      message.success('Coupon applied! 10% discount.');
    } else {
      setDiscount(0);
      message.error('Invalid coupon code.');
    }
  };

  const handlePlaceOrder = () => {
    if (total > 0) {
      onPlaceOrder({ cartItems, paymentMethod, total });
      message.success('Order placed successfully!');
    }
  };

  return (
    <div className="order-summary">
      <h2>Your Order</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="order-item">
          <img src={item.image} alt={item.name} />
          <span>{item.name}</span>
          <span>${item.price.toLocaleString()}</span>
        </div>
      ))}
      <div className="order-total">
        <div className="total-row">
          <span>Subtotal:</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="total-row">
          <span>Shipping:</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toLocaleString()}`}</span>
        </div>
        <div className="total-row total">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>
      <Radio.Group
        onChange={(e) => setPaymentMethod(e.target.value)}
        value={paymentMethod}
        className="payment-method"
      >
        <div className='bank-container'>
          <Radio value="bank">Bank</Radio>
          <div className="bank-logos">
            <img src="https://pay2s.vn/wp-content/uploads/2024/10/thumbnail-logo-BIDV.jpg" alt="Bank 1" />
            <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Bank 2" />
            <img src="https://www.inlogo.vn/vnt_upload/File/Image/logo_VCB_828891.jpg" alt="Bank 3" />
          </div>
        </div>
        <Radio value="cash">Cash on delivery</Radio>
      </Radio.Group>
      <div className="coupon-section">
        <Input
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button type="default" onClick={applyCoupon}>
          Apply Coupon
        </Button>
      </div>
      <Button type="primary" block onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  );
};


function Billing() {
  const [cartItems] = useState([
    { id: 1, name: 'LCD Monitor', price: 650, quantity: 1, image: 'https://images.philips.com/is/image/philipsconsumer/7daebfa708a148d7a0bbb01b009011d1?wid=700&hei=700&$pnglarge$' },
    { id: 2, name: 'Hi Gamepad', price: 1100, quantity: 1, image: 'https://images.philips.com/is/image/philipsconsumer/7daebfa708a148d7a0bbb01b009011d1?wid=700&hei=700&$pnglarge$' },
  ]);

  const handleSaveBilling = (billingData) => {
    console.log('Saved Billing Data:', billingData);
    // Logic lưu thông tin người dùng (có thể tích hợp API)
  };

  const handlePlaceOrder = (orderData) => {
    console.log('Order Data:', orderData);
    // Logic đặt hàng (có thể tích hợp API)
  };

  return (
    <div className="checkout-container">
      <BillingForm onSave={handleSaveBilling} />
      <OrderSummary cartItems={cartItems} onPlaceOrder={handlePlaceOrder} />
    </div>
  )
}


export default Billing;