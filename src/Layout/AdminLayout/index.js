import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Menu, Layout} from 'antd';
import { Outlet } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { MdDashboard, MdOutlineBorderColor, MdInventory, MdViewCarousel } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";


import './AdminLayout.scss';
import logo from '../../assets/images/logo.png';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';


const AdminHeader = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);


  // Logic cho user button
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/account'); // Khi đã đăng nhập, click username dẫn đến trang account
    } else {
      navigate('/login'); // Chưa đăng nhập thì dẫn đến trang login
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
              Zenith
            </Link>
          </Col>
          
          <Col xs={12} md={8} className="header-actions">
            <Button
              type="dashed"
              shape="round"
              icon={<UserOutlined />}
              onClick={handleUserClick}
            >
              {isLoggedIn && user ? (user.fullname || user.username) : 'Sign in'}
            </Button>
          </Col>
        </Row>
      </header>
    </>
  );
};


const AdminMenu = () => {
  const  navigate = useNavigate();

  return (
    <div className="menu">
      <Menu
        mode="vertical"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<MdDashboard style={{ fontSize: '24px' }} />}
         onClick={() => navigate('/admin/dashboard')}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<FaShoppingCart style={{ fontSize: '24px' }} />}
        onClick={() => navigate('/admin/manage-product')}>
          Manage Product
        </Menu.Item>
        {/* <Menu.Item key="3" icon={<MdCategory style={{ fontSize: '24px' }} />}
        onClick={() => navigate('/admin/manage-categories')}>
          Manage Categories
        </Menu.Item> */}
        <Menu.Item key="3" icon={<MdOutlineBorderColor style={{ fontSize: '24px' }} />}
        onClick={() => navigate('/admin/view-order')}>
          View Order
        </Menu.Item>
        <Menu.Item key="4" icon={<BsPersonLinesFill style={{ fontSize: '24px' }} />}
        onClick={() => navigate('/admin/manage-customer')}>
          Customer
        </Menu.Item>
        <Menu.Item key="6" icon={<MdInventory style={{ fontSize: '24px' }} />}
        onClick={() => navigate('/admin/promotion')}>
          Flash Sale
        </Menu.Item>
        <Menu.Item key="7" icon={<MdViewCarousel style={{ fontSize: '24px' }} />}
        onClick={() => navigate('/admin/manage-banner')}>
          Manage Panel
        </Menu.Item>
        <Menu.Item 
          key="5" 
          icon={<HiSpeakerWave style={{ fontSize: '24px' }} />} 
          onClick={() => navigate('/admin/manage-categories-supplier')}
          style={{ height: '60px', display: 'flex', alignItems: 'center' }}
        >
          <span style={{ lineHeight: '1', whiteSpace: 'normal' }}>
            Category &<br />Supplier
          </span>
        </Menu.Item>

        {/* <Menu.Item key="6" icon={<MdInventory style={{ fontSize: '24px' }} />}
        onClick={() => navigate('/admin/inventory')}>
          Inventory
        </Menu.Item> */}
      </Menu>
    </div>
  )
}


const AdminFooter = () => {
  return (
    <>
      <div className='footer'>
        © 2025 Zenith - All Rights Reserved
      </div>
    </>
  );
};


function Adminlayout() {

  return (
    <>
    <AdminHeader />

    <Layout className="admin-layout">
      {/* Sider cho AdminMenu */}
      <Sider className="sider" theme="light" width={250} >
        <AdminMenu />
      </Sider>

      {/* Phần còn lại là Content */}
      <Layout className="main-layout">
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>

    <AdminFooter />
  </>
  );
}

export default Adminlayout;
