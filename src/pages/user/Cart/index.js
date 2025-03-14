import React from 'react';
import { Button, InputNumber, Input } from 'antd';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { FaTrashAlt } from "react-icons/fa";
import { useState } from 'react';
import ProductRelated from '../../../components/ProductRelated';
import products from '../../../utils/mock_data';
import './Cart.scss';


const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const handleDecrease = () => {
    // Giảm số lượng, nhưng không để nhỏ hơn 1
    const newQuantity = Math.max(1, item.quantity - 1);
    onQuantityChange(item.id, newQuantity);
  };

  const handleIncrease = () => {
    // Tăng số lượng
    const newQuantity = item.quantity + 1;
    onQuantityChange(item.id, newQuantity);
  };

  return (
    <div className="cart-item">
      <div className='item-image'>
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-details">
        <span>{item.name}</span>
      </div>

      <div className="quantity-control">
        <Button
          icon={<MinusOutlined />}
          onClick={handleDecrease}
          className="quantity-button"
          disabled={item.quantity <= 1}
        />
        <span className="quantity-value">{item.quantity}</span>
        <Button
          icon={<PlusOutlined />}
          onClick={handleIncrease}
          className="quantity-button"
        />
      </div>

      <span className="subtotal">{(item.price * item.quantity).toLocaleString()}</span>
      <Button className='remove-button' icon={<FaTrashAlt />} type="link" danger onClick={() => onRemove(item.id)} />
    </div>
  );
};


const CartSummary = ({ cartTotal, applyCoupon, couponCode, setCouponCode }) => {
  return (
    <div className="cart-summary">
      <h3>Cart Total</h3>
      <div className="summary-row">
        <span>Subtotal:</span>
        <span>{cartTotal.toLocaleString()}</span>
      </div>
      <div className="summary-row">
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      <div className="summary-row total">
        <span>Total:</span>
        <span>{cartTotal.toLocaleString()}đ</span>
      </div>
      <Button type="default" block onClick={() => alert('Proceeding to checkout')}>
        Process to checkout
      </Button>
      <div className="coupon-section">
        <Input
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button type="default" onClick={() => applyCoupon(couponCode)}>
          Apply Coupon
        </Button>
      </div>
    </div>
  );
};


function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'LCD Monitor',
      price: 1200000,
      quantity: 1,
      image: 'https://images.philips.com/is/image/philipsconsumer/7daebfa708a148d7a0bbb01b009011d1?wid=700&hei=700&$pnglarge$', // Thay bằng URL ảnh thực tế
    },
    {
      id: 2,
      name: 'Hi Gamepad',
      price: 4390000,
      quantity: 2,
      image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTBtbu6EpQ4Vu0_PPg4oPN13mRKFIWk85Og0ZJFfgcfq35E_7qyXGgvA1vBH4yB8kCF9XmlBHtx0f8IqXRn0Tj3yHjaze0zJfHEVxzLCdDdMnKeFB9-bkIb35iJEVDAKdaQW-RA9A&usqp=CAc', // Thay bằng URL ảnh thực tế
    },
  ]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);


  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: quantity } : item
    ));
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyCoupon = (code) => {
    // Logic áp dụng coupon (ví dụ: giảm 10% nếu mã là "DISCOUNT10")
    if (code === 'DISCOUNT10') {
      setDiscount(cartTotal * 0.1);
      alert('Coupon applied! 10% discount.');
    } else {
      setDiscount(0);
      alert('Invalid coupon code.');
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0) - discount;

  return (
    <>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
          <Button type="link" className="return-shop">
            Return To Shop
          </Button>
        </div>
        <CartSummary
          cartTotal={cartTotal}
          applyCoupon={applyCoupon}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
        />
      </div>
      <ProductRelated products={products}/>
    </>
  );
}

export default Cart;