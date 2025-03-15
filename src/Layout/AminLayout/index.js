import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Input, Button, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import './AdminLayout.scss';
import logo from '../../assets/images/logo.png';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { isLoggedIn, user } = useSelector((state) => state.auth);


  // Logic cho user button
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/account'); // Khi đã đăng nhập, click username dẫn đến trang account
    } else {
      navigate('/login'); // Chưa đăng nhập thì dẫn đến trang login
    }
  };

  // Logic cho search
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchValue.trim()) {
      try {
        const response = await fetch('YOUR_API_ENDPOINT/search'); // Thay bằng API search nếu cần
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    }
  };

  return (
    <>
      <div className="decorative-bar"></div>
      <header className="header">
        <Row align="middle" className="header-container">
          <Col xs={12} md={4} className="logo-container">
            <Link to="/" className="logo">
              <img src={logo} alt="Zenith Logo" />
              Zenit
            </Link>
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
            <Button
              type="dashed"
              shape="round"
              icon={<UserOutlined />}
              onClick={handleUserClick}
            >
              {isLoggedIn && user?.username ? user.username : 'Sign in'}
            </Button>
          </Col>
        </Row>
      </header>
    </>
  );
};

function Adminlayout() {
  return (
    <>
      <AdminHeader />
    </>
  );
}

export default Adminlayout;
