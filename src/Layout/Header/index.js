import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Input, Button, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { FaHome, FaShoppingCart, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { get } from '../../utils/requests';
import './Header.scss';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantityProduct = isLoggedIn ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const [menuVisible, setMenuVisible] = useState(false); // State để toggle menu
  // Logic cho cart
  const handleAddToCart = () => {
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };
  // Logic cho user button
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/account'); // Khi đã đăng nhập, click username dẫn đến trang account
    } else {
      navigate('/login'); // Chưa đăng nhập thì dẫn đến trang login
    }
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      // Navigate to /products with search keyword as query parameter
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      // If search is empty, navigate to /products without query
      navigate('/products');
    }
    setSearchValue('');
  };

  // 1. Xác định tên hiển thị (Ưu tiên fullname, sau đó đến username)
  const rawName = user?.fullname || user?.username || "";

  // 2. Logic cắt chuỗi: Nếu dài hơn 10 ký tự thì lấy 10 ký tự đầu + "..."
  const displayName = rawName.length > 10
    ? `${rawName.substring(0, 10)}...`
    : rawName;

  return (
    <>
      <div className="decorative-bar"></div>
      <header className="header">
        <Row align="middle" className="header-container">
          <Col xs={12} md={4} className="logo-container">
            <Link to="/" className="logo">
              <img src={logo} alt="Zenith Logo" />
              <p>Zenith</p>
            </Link>
          </Col>

          <Col xs={4} md={0} className="menu-toggle">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMenuVisible(!menuVisible)}
            />
          </Col>

          <Col xs={0} md={12} className={`nav-links ${menuVisible ? 'active' : ''}`}>
            <nav>
              <Link to="/" className="nav-link">
                <FaHome /> Home
              </Link>
              <Link to="/products" className="nav-link">
                <FaShoppingCart /> Shop
              </Link>
              <Link to="/about" className="nav-link">
                <FaInfoCircle /> About
              </Link>
              <Link to="/contact" className="nav-link">
                <FaEnvelope /> Contact
              </Link>
            </nav>
          </Col>

          <Col xs={12} md={8} className="header-actions">
            <Input
              placeholder="What you looking for?"
              suffix={<SearchOutlined onClick={handleSearchSubmit} />}
              className="search-bar"
              value={searchValue}
              onChange={handleSearch}
              onPressEnter={handleSearchSubmit}
            />
            <Badge count={totalQuantityProduct} showZero>
              <Button
                type="dashed"
                shape="round"
                icon={<ShoppingCartOutlined />}
                className="cart-icon"
                onClick={handleAddToCart}
              >
                Cart
              </Button>
            </Badge>
            <Button
              type="dashed"
              shape="round"
              icon={<UserOutlined />}
              onClick={handleUserClick}
            >
              {isLoggedIn && user ? (displayName) : 'Sign in'}
            </Button>
          </Col>
        </Row>
      </header>
    </>
  );
};

export default Header;