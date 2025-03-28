import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Radio, Typography } from 'antd';
import { priceRanges, sortOptions } from '../../utils/filter';
import { get } from '../../utils/requests'; 
import './FilterCommon.scss';

const { Option } = Select;
const { Title } = Typography;

const FilterSetion = ({ onProductsChange }) => {
  const [priceRange, setPriceRange] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  // Truyền products ra ngoài khi thay đổi
  useEffect(() => {
    onProductsChange(products);
  }, [products, onProductsChange]);

  // Hàm lấy dữ liệu theo khoảng giá
  const fetchProductsByPriceRange = async () => {
    try {
      const params = new URLSearchParams();
      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        if (priceRange === '>2000') {
          params.append('minPrice', 2000);
        } else {
          params.append('minPrice', min);
          params.append('maxPrice', max);
        }
      }

      const response = await get(`product-variant/filter/price?${params.toString()}`);
      console.log('Price filter response:', response);

      // Kiểm tra response có hợp lệ không
      if (!response) {
        throw new Error('No response received from price filter API');
      }

      // Giả định response đã là JSON (hàm get tự parse)
      const data = response;

      if (data.status) {
        setFilteredProducts(data.data);
        setProducts(data.data); // Cập nhật danh sách sản phẩm
      } else {
        console.error('Error from price filter API:', data.message);
        setFilteredProducts([]);
        setProducts([]);
      }
    } catch (error) {
      console.log('Error fetching products by price range: ', error);
      setFilteredProducts([]);
      setProducts([]);
    }
  };

  // Hàm lấy dữ liệu theo tiêu chí sắp xếp
  const fetchProductsBySortOption = async () => {
    try {
      console.log('Fetching products by sort option:', sortOption);
      const params = new URLSearchParams();
      if (sortOption) {
        params.append('sortBy', sortOption);
      } else {
        console.log('No sort option selected, skipping sort API call');
        return; // Không gọi API nếu sortOption là null
      }

      const response = await get(`product-variant/sort?${params.toString()}`);
      console.log('Sort response:', response);

      if (!response) {
        throw new Error('No response received from sort API');
      }

      const data = response;

      if (data.status) {
        if (filteredProducts.length > 0) {
          // Nếu đã có filteredProducts, chỉ sắp xếp lại filteredProducts
          setProducts(data.data.filter(product => 
            filteredProducts.some(filtered => filtered.id === product.id)
          ));
        } else {
          setProducts(data.data); // Nếu không có lọc giá, dùng toàn bộ danh sách đã sắp xếp
        }
      } else {
        console.error('Error from sort API:', data.message);
        setProducts([]);
      }
    } catch (error) {
      console.log('Error fetching products by sort: ', error);
      setProducts([]);
    }
  };

  // Xử lý khi chọn khoảng giá
  useEffect(() => {
    fetchProductsByPriceRange();
  }, [priceRange]);

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };
  // Xử lý khi chọn tiêu chí sắp xếp
  useEffect(() => {
    fetchProductsBySortOption();
  }, [sortOption]); 
  
  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      <div className="filter-container">
        {/* Chọn khoảng giá */}
        <Row gutter={[16, 16]} align="middle">
          <Col className="filter-content">
            <Title level={5}>Chọn khoảng giá:</Title>
            <Select
              className="price-select"
              defaultValue="100-500"
              onChange={handlePriceRangeChange}
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
          <Col className="filter-content">
            <Title level={5}>Sắp xếp theo:</Title>
            <Radio.Group
              className="price-select"
              onChange={handleSortOptionChange}
              value={sortOption}
              buttonStyle="solid"
              allowClear
            >
              {sortOptions.map((option) => (
                <Radio.Button key={option.value} value={option.value}>
                  {option.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FilterSetion;