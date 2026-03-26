import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Space, Typography, Card, Row, Col, InputNumber, Popconfirm, message } from 'antd';
import { DeleteOutlined, ShopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../../slices/cartSlice';
import Loading from '../../../components/Loading';
import useAllProduct from '../../../hook/useAllProduct';
import { numPageProductHeader } from '../../../utils/variable';
import ProductRelated from '../../../components/ProductRelated';
import './Cart.scss';

const { Text, Title } = Typography;

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const [selectedItems, setSelectedItems] = useState([]);

  // Setup related products
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const { products: productsSearch, loading, totalPages } = useAllProduct({ page, pageSize: numPageProductHeader });
  
  useEffect(() => {
    if (productsSearch) setProducts(productsSearch);
  }, [productsSearch]);

  const handlePaginationChange = (newPage) => setPage(newPage);

  // Cart actions
  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length === 0) {
      message.warning('Please select items to delete');
      return;
    }
    selectedItems.forEach(id => dispatch(removeFromCart(id)));
    setSelectedItems([]);
    message.success('Removed selected items');
  };

  // Selection logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectChange = (id, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
  const cartTotal = selectedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      message.warning('You have not selected any items for checkout');
      return;
    }
    navigate('/billing', { state: { cartTotal, selectedItems: selectedCartItems } });
  };

  if (loading && cartItems.length === 0) return <Loading loading={loading} />;

  return (
    <div className="cart-page">
      <Title level={3} className="page-title">Shopping Cart</Title>

      <div className="cart-layout">
        {/* Table Header mock */}
        <Card className="cart-header-card" bordered={false} bodyStyle={{ padding: '16px 24px' }}>
          <Row align="middle">
            <Col span={10}>
              <Checkbox 
                checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
                indeterminate={selectedItems.length > 0 && selectedItems.length < cartItems.length}
                onChange={handleSelectAll}
              >
                Product
              </Checkbox>
            </Col>
            <Col span={4} className="text-center">Unit Price</Col>
            <Col span={4} className="text-center">Quantity</Col>
            <Col span={4} className="text-center">Total Price</Col>
            <Col span={2} className="text-center">Actions</Col>
          </Row>
        </Card>

        {/* Shop group (Assume all in one shop for now) */}
        {cartItems.length > 0 ? (
          <Card bordered={false} className="cart-items-card" bodyStyle={{ padding: '0 24px' }}>
            <div className="shop-header">
              <Checkbox 
                checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
                indeterminate={selectedItems.length > 0 && selectedItems.length < cartItems.length}
                onChange={handleSelectAll}
              >
                <Space><ShopOutlined /> PTIT Official Mall</Space>
              </Checkbox>
            </div>

            <div className="cart-items-list">
              {cartItems.map(item => (
                <Row key={item.id} className="cart-item-row" align="middle">
                  <Col span={10} className="product-col">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => handleSelectChange(item.id, e.target.checked)}
                      className="item-checkbox"
                    />
                    <img src={item.imagePaths?.[0] || "default-image.jpg"} alt={item.name} className="item-img" />
                    <div className="item-info">
                      <Text className="item-name">{item.name}</Text>
                      {/* You can add variant details here */}
                    </div>
                  </Col>
                  <Col span={4} className="text-center">
                    <Text>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</Text>
                  </Col>
                  <Col span={4} className="text-center">
                    <InputNumber 
                      min={1} 
                      max={item.quantityStock || 99}
                      value={item.quantity} 
                      onChange={(val) => handleQuantityChange(item.id, val)} 
                    />
                  </Col>
                  <Col span={4} className="text-center">
                    <Text type="danger" strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</Text>
                  </Col>
                  <Col span={2} className="text-center action-col">
                    <Popconfirm
                      title="Delete product"
                      description="Are you sure you want to remove this from cart?"
                      onConfirm={() => handleRemove(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Col>
                </Row>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="empty-cart-card" bordered={false}>
            <div className="empty-state">
              <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/9bdd8040b334d31946f49e36beaf32db.png" alt="Empty Cart" />
              <p>Your shopping cart is empty</p>
              <Button type="primary" onClick={() => navigate('/products')}>Go Shopping Now</Button>
            </div>
          </Card>
        )}

        {/* Global Bottom Bar */}
        {cartItems.length > 0 && (
          <div className="cart-footer-bar">
            <Row align="middle" justify="space-between" style={{ width: '100%' }}>
              <Col>
                <Space size="large">
                  <Checkbox 
                    checked={cartItems.length > 0 && selectedItems.length === cartItems.length}
                    indeterminate={selectedItems.length > 0 && selectedItems.length < cartItems.length}
                    onChange={handleSelectAll}
                  >
                    Select All ({cartItems.length})
                  </Checkbox>
                  <Button type="link" danger onClick={handleRemoveSelected}>Delete</Button>
                </Space>
              </Col>
              <Col className="checkout-section">
                <Space size="middle" align="center">
                  <div className="total-calculation">
                    <Text>Total ({selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}): </Text>
                    <Text className="total-price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartTotal)}</Text>
                  </div>
                  <Button type="primary" className="checkout-btn" onClick={handleCheckout}>
                    Check Out
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        )}
      </div>

      <div style={{ marginTop: '40px' }}>
        <Title level={4}>You may also like</Title>
        <ProductRelated
          products={products}
          pageSize={numPageProductHeader}
          totalPages={totalPages}
          currentPage={page}
          loading={loading}
          onPageChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}

export default Cart;