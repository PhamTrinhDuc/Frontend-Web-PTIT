
import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Radio, Typography } from 'antd';
import {priceRanges, sortOptions} from '../../utils/filter';
import './FilterCommon.scss';

const { Option } = Select;
const { Title } = Typography;

const FilterSetion = () => {
  const [priceRange, setPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState('newnest');
  const [products, setProducts] = useState([]);

  // Hàm lấy dữ liệu từ API dựa trên filter
  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        if (priceRange === '>50') {
          params.append('minPrice', 50_000_000); // Chuyển thành số (giả định đơn vị là đồng)
        } else {
          params.append('minPrice', min * 1_000_000); // Chuyển triệu thành số
          params.append('maxPrice', max * 1_000_000);
        }
      }

      if (sortBy) {
        params.append('sortBy', sortBy);
      }

      // Gọi API với query params
      const response = await fetch(`http://localhost:8080/api/product-variants/filter?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (data.status === 'success') {
        setProducts(data.data);
      } else {
        console.error('Error from API:', data.message);
        setProducts([]);
      }
    } catch (error) {
      console.log('Error: ', error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [priceRange, sortBy]);
  return (
    <>
      <div className="filter-container">
         {/* Chọn khoảng giá */}
        <Row gutter={[16, 16]} align="middle">
          <Col className='filter-content'>
            <Title level={5}>Chọn khoảng giá:</Title>
            <Select
              className='price-select'
              defaultValue="10-15 triệu"
              onChange={(value) => setPriceRange(value)}
              style={{ width: 120 }}
              allowClear
            >
              {priceRanges.map((range) => (
                <Option key={range.value} value={range.value}>
                  {range.label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Sắp xếp theo */}
        <Row gutter={[16, 16]} align="middle">
          <Col className='filter-content'>
            <Title level={5}>Sắp xếp theo:</Title>
            <Radio.Group
              className='price-select'
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
              buttonStyle="solid"
              allowClear
            >
              {sortOptions.map((option) => (
                <Radio.Button  key={option.value} value={option.value}>
                  {option.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default FilterSetion;