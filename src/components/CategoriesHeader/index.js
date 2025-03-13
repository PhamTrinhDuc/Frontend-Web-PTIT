import {iconMapCategory} from '../../utils/icon_mapping';
import { Row, Col, Select, Dropdown, Typography, Button, Menu } from 'antd';
import {DownOutlined} from '@ant-design/icons';
import { MdMenu } from "react-icons/md";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './CategoriesHeader.scss';


const categories = [
  {
    id: 1,
    name: 'Laptop',
    icon: 'LaptopOutlined',
  },
  {
    id: 2,
    name: 'Keyboard',
    icon: 'KeyboardOutlined',
  },
  {
    id: 3,
    name: 'Gamming',
    icon: 'GammingOutlined',
  },
  {
    id: 4,
    name: 'Items',
    icon: 'ItemsOutlined',
  },
  {
    id: 5,
    name: 'Phone',
    icon: 'PhoneOutlined',
  },
  {
    id: 6,
    name: 'Best Seller',
    icon: 'SellerOutlined',
  },
  {
    id: 7,
    name: 'Hot Deals',
    icon: 'DeadHotOutlined',
  },
]


function CategoriesHeader() {
  const dropdownMenu = (
    <Menu>
      {categories.map((category) => (
        <Menu.Item key={category.id}>
          <Link to={`/products/${category.name}`}>
            <span style={{ marginRight: 8 }}>{iconMapCategory[category.icon] || null}</span>
            {category.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <>
      <div className='categories-categories'>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={3}>
            <Dropdown overlay={dropdownMenu} trigger={['click']}>
              <Link onClick={(e) => e.preventDefault()} className='menu-content'>
                <MdMenu className='menu-icon' />
                <p>Menu</p> 
              </ Link>
            </Dropdown>
          </Col>

          {categories.map((category) => (
            <Col xs={24} sm={12} md={8} lg={3} key={category.id}>
              <Link to={`/products/${category.name}`}>
                <div className='item-category'>
                  <div className='category-icon'>
                    {iconMapCategory[category.icon]}
                  </div>
                  <div className='category-name'>
                    {category.name}
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

   
export default CategoriesHeader;