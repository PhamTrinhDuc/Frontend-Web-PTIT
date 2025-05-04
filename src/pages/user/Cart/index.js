import React from 'react';
import { useEffect } from 'react';
import PanigationProduct from '../../../components/PanigationProduct';
import { Button, InputNumber, Input, Checkbox } from 'antd'; // Added Checkbox import
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { FaTrashAlt } from "react-icons/fa";
import { useState } from 'react';
import { updateQuantity, removeFromCart } from '../../../slices/cartSlice';
import Loading from '../../../components/Loading';
import useAllProduct from '../../../hook/useAllProduct';
import { numPageProductHeader } from '../../../utils/variable';
import './Cart.scss';
import ProductRelated from '../../../components/ProductRelated';


const CartItem = ({ item, onQuantityChange, onRemove, onSelectChange, isSelected }) => {
  const handleDecrease = () => {
    const newQuantity = Math.max(1, item.quantity - 1);
    onQuantityChange(item.id, newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = item.quantity + 1;
    onQuantityChange(item.id, newQuantity);
  };

  return (
    <div className="cart-item">
      <Checkbox
        checked={isSelected}
        onChange={(e) => onSelectChange(item.id, e.target.checked)}
      />
      <div className='item-image'>
        <img src={item.imagePaths?.[0] || "default-image.jpg"} alt={item.name} />
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

      <span className="subtotal">{(item.price * item.quantity).toLocaleString()}$</span>
      <Button className='remove-button' icon={<FaTrashAlt />} type="link" danger onClick={() => onRemove(item.id)} />
    </div>
  );
};


const CartSummary = ({ cartTotal, applyCoupon, couponCode, setCouponCode, selectedItems }) => {
  const navigate = useNavigate();
  const handlePay = () => {
    navigate('/billing', { state: { cartTotal, selectedItems } });  
  }

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
        <span>{cartTotal.toLocaleString()}$</span>
      </div>
      <Button type="default" block onClick={handlePay}>
        Process to checkout
      </Button>
      {/* <div className="coupon-section">
        <Input
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <Button type="default" onClick={() => applyCoupon(couponCode)}>
          Apply Coupon
        </Button>
      </div> */}
    </div>
  );
};


function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = numPageProductHeader;
  
  const { products: productsSearch, loading, error, totalPages } = useAllProduct({ page, pageSize });
  useEffect(() => {
    if (productsSearch) {
      setProducts(productsSearch);
    }
  }, [productsSearch]);

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  const cartItems = useSelector((state) => state.cart.items);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    setSelectedItems(selectedItems.filter(itemId => itemId !== id)); // Remove from selected items
  };
  const handleReturnShop = () => {
    navigate('/products');
  };

  const applyCoupon = (code) => {
    if (code === 'DISCOUNT10') {
      setDiscount(cartTotal * 0.1);
      alert('Coupon applied! 10% discount.');
    } else {
      setDiscount(0);
      alert('Invalid coupon code.');
    }
  };
  // Handle checkbox change
  const handleSelectChange = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };
  // Calculate total based on selected items only
  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
  const cartTotal = selectedCartItems.reduce((total, item) => total + item.price * item.quantity, 0) - discount;

  if (loading) return <Loading loading={loading} />;

  return (
    <>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem
              key = {item.id}
              item = {item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              onSelectChange={handleSelectChange}
              isSelected={selectedItems.includes(item.id)}
            />
          ))}
          <Button type="link" className="return-shop" onClick={handleReturnShop}>
            Return To Shop
          </Button>
        </div>
        <CartSummary
          cartTotal={cartTotal}
          applyCoupon={applyCoupon}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          selectedItems={selectedCartItems} // Pass selected items
        />
      </div>

      <ProductRelated
        products={products}
        pageSize={pageSize}
        totalPages={totalPages}
        currentPage={page}
        loading={loading}
        onPageChange={handlePaginationChange}
      />
    </>
  );
}

export default Cart;