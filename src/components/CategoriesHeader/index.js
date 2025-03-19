import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import {categoryIcons} from '../../utils/icons';
import { Row, Col, Select, Dropdown, Typography, Button, Menu } from 'antd';
import { MdMenu } from "react-icons/md";
import { get } from '../../utils/requests';
import { Link } from 'react-router-dom';
import './CategoriesHeader.scss';


function CategoriesHeader() {

  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await get("categories");
  
          if (!response || response.code !== 200) {
            throw new Error(response?.message || "Failed to fetch categories");
          }
  
          console.log(response.result);
          const formattedData = response.result.map((category) => ({
            ...category,
            name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
          }));
  
          setCategoriesList(formattedData);
        } catch (error) {
          console.error("Error fetching categories:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategories();
    }, []);
  
    if (loading) {
      return <Loading loading={loading} />;
    }
    if (error) {
      navigate("/error");
      return null;
    }

  const dropdownMenu = (
    <Menu>
      {categoriesList.map((category) => (
        <Menu.Item key={category.id}>
          <Link to={`/products/${category.name}`}>
            <span style={{ marginRight: 8 }}></span>
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
                <div className='icon-container'>
                  <MdMenu className='custom-icon' />
                </div>
                <div className='category-name'>
                  Menu
                </div>
              </ Link>
            </Dropdown>
          </Col>

          {categoriesList.slice(0, 7).map((category) => (
            <Col xs={24} sm={12} md={8} lg={3} key={category.id}>
              <Link to={`/products/${category.slug}`}>
                <div className='item-category'>
                  <div className='icon-container'>
                    {categoryIcons[category.slug]}
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