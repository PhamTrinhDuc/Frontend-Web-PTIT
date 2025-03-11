import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Button, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { FaHome, FaShoppingCart, FaInfoCircle, FaEnvelope} from "react-icons/fa";
import './Header.scss';
import logo from '../../assets/images/logo.png'

const Header = () => {
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
              <Link to="shop" className="nav-link">
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
              prefix={<SearchOutlined />}
              className="search-bar"
            />
            
            <Link to="/shop">
              <Badge count={0} showZero>
                  <Button type="link" icon={<ShoppingCartOutlined />} className="cart-icon">
                    Cart
                  </Button>
              </Badge>
            </Link>

            <Link to="/signin">
              <Button type="link" icon={<UserOutlined />}>
                Sign in
              </Button>
            </Link>
          </Col>
        </Row>
      </header>
    </>
  );
};

export default Header;