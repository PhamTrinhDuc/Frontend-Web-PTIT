import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input, Button, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { FaHome, FaShoppingCart, FaInfoCircle, FaEnvelope} from "react-icons/fa";
import { login, logout } from '../../slices/authSlide';
import './Header.scss';
import logo from '../../assets/images/logo.png'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // logic cho login va cart
  const handleAddToCart = () => {
    if (isLoggedIn) {
      // Nếu đã đăng nhập, chuyển đến trang giỏ hàng
      navigate('/cart');
    } else {
      // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
      navigate('/login');
    }
  };

  const handleLogin = () => {
    // Nếu đã đăng nhập, logout
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
      navigate('/login');
    }
  }
  // logic cho search
  const handleSearch = (e)  => {
    setSearchValue(e.target.value);
  }

  const handleSearchSubmit = async() => {
    if(searchValue.trim()){
      try {
        const response = await fetch("")
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    }
  }

  return (
    <>
      <div className="decorative-bar"></div>
      <header className="header">
        <Row align="middle" className="header-container">
          <Col xs={12} md={4} className="logo-container">
            <Link to="/" className='logo'>
              <img src={logo}></img>
              Zenith
            </Link>
          </Col>
          <Col xs={0} md={12} className="nav-links">
          <nav>
              <Link to="/" className="nav-link">
                <FaHome /> Home
              </Link>
              <Link to="products" className="nav-link">
                <FaShoppingCart /> Shop
              </Link>
              <Link to="about" className="nav-link">
                <FaInfoCircle /> About
              </Link>
              <Link to="contact" className="nav-link">
                <FaEnvelope /> Contact
              </Link>
            </nav>
          </Col>
          <Col xs={12} md={8} className="header-actions">
            <Input
              placeholder="What you looking for?"
              suffix={<SearchOutlined onClick={handleSearchSubmit} /> }
              className="search-bar"
              value={searchValue}
              onChange={handleSearch}
              onPressEnter={handleSearchSubmit}
            />
            
            {/* <Link to="/shop"> */}
            <Badge count={0} showZero>
                <Button type="dashed" shape='round' icon={<ShoppingCartOutlined />} className="cart-icon"  onClick={handleAddToCart}>
                  Cart
                </Button>
            </Badge>
            {/* </Link> */}

            {/* <Link to="/signin"> */}
            <Button type="dashed" shape='round' icon={<UserOutlined />} 
            onClick={handleLogin}>
              Sign in
            </Button>
            {/* </Link> */}
          </Col>
        </Row>
      </header>
    </>
  );
};

export default Header;