import { Row, Col, Input, Button } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { FaLocationArrow, FaCopyright  } from "react-icons/fa";

import './Footer.scss';



function Footer() {
  return (
    <footer className="footer">
      <Row gutter={[16, 16]} className="footer-container">
        <Col xs={24} sm={12} md={6} className="footer-section">
          <h3>follow us</h3>
          <div className="social-icons">
            <a href="#" target="_blank"><FacebookOutlined /></a>
            <a href="#" target="_blank"><TwitterOutlined /></a>
            <a href="#" target="_blank"><InstagramOutlined /></a>
          </div>
          <p>Subscribe to get 10% off your first order</p>
          <div className="subscribe-form">
            <Input placeholder="Enter your email" />
            <Button type="primary" shape="circle" icon={<FaLocationArrow />} />
          </div>
        </Col>
        <Col xs={24} sm={12} md={6} className="footer-section">
          <h3>support</h3>
          <p><PhoneOutlined /> +84 123-456-789</p>
          <p><PhoneOutlined /> +84 123-456-789</p>
          <p><MailOutlined /> 
            <a href="mailto:support@example.com">support@example.com</a>
          </p>
        </Col>
        <Col xs={24} sm={12} md={6} className="footer-section">
          <h3>BRANCH</h3>
          <ul>
            <li>1. 09a Lê Văn Hưng, Quận 5, TP. HCM</li>
            <li>2. 10 Nguyễn Văn Cừ, Quận 1, TP. HCM</li>
            <li>3. 15 Trần Hưng Đạo, Hà Nội</li>
            <li>4. 22 Hùng Vương, Đà Nẵng</li>
            <li>5. 34A Phạm Ngũ Lão, Cần Thơ</li>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6} className="footer-section">
          <h3>QUICK LINK</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Customer Support</a></li>
          </ul>
        </Col>
      </Row>
      <p className='coppyright'>
        <FaCopyright /> Rimel 2025. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;