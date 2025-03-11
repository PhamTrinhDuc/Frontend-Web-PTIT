import React from 'react';
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-wrapper">

          <div className='block-decor'></div>
          <div className="logo">
            <h1>ZENITH</h1>
          </div>
          
          <div className="search">
            <input type="text" placeholder="Tìm kiếm..." />
            <button><FaSearch /></button>
          </div>
          
          <div className="user-actions">
            <div className="action-item">
              <FaUser />
              <span>Tài khoản</span>
            </div>
            <div className="action-item">
              <FaHeart />
              <span>Yêu thích</span>
            </div>
            <div className="action-item">
              <FaShoppingCart />
              <span>Giỏ hàng</span>
            </div>
          </div>
        </div>
        
        <nav>
          <ul>
            <li><a href="#home">TRANG CHỦ</a></li>
            <li><a href="#about">GIỚI THIỆU</a></li>
            <li><a href="#products">SẢN PHẨM</a></li>
            <li><a href="#news">TIN TỨC</a></li>
            <li><a href="#contact">LIÊN HỆ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;