import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Input, Button, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { FaHome, FaShoppingCart, FaInfoCircle, FaEnvelope} from "react-icons/fa";
import './Header.scss';
import logo from '../../assets/images/logo.png'

const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e)  => {
    setSearchValue(e.target.value);
  }

  const handleSearchSubmit = async() => {
    console.log(searchValue);
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
              suffix={<SearchOutlined onClick={handleSearchSubmit} /> }
              className="search-bar"
              value={searchValue}
              onChange={handleSearch}
              onPressEnter={handleSearchSubmit}
            />
            
            {/* <Link to="/shop"> */}
            <Badge count={0} showZero>
                <Button type="dashed" shape='round' icon={<ShoppingCartOutlined />} className="cart-icon" href='/shop'>
                  Cart
                </Button>
            </Badge>
            {/* </Link> */}

            {/* <Link to="/signin"> */}
            <Button type="dashed" shape='round' icon={<UserOutlined />} href='/login'>
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