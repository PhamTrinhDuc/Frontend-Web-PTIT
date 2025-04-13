import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Radio, Typography } from 'antd';
import { priceRanges, sortOptions } from '../../utils/filter';
import { get } from '../../utils/requests';
import './FilterCommon.scss';

const { Option } = Select;
const { Title } = Typography;

const FilterSetion = ({ onProductsChange }) => {
  const [priceRange, setPriceRange] = useState(null);
  const [sortOption, setSortOption] = useState(null); // Đặt mặc định là null
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState();

  // Truyền products ra ngoài khi thay đổi
  useEffect(() => {
    onProductsChange(products);
  }, [products]);

  // Hàm lấy dữ liệu theo khoảng giá
  const fetchProductsByPriceRange = async () => {
    if (!priceRange) return; // Không gọi API nếu priceRange là null

    try {
      const params = new URLSearchParams();
      const [min, max] = priceRange.split('-').map(Number);
      if (priceRange === '>2000') {
        params.append('minPrice', 2000);
      } else {
        params.append('minPrice', min);
        params.append('maxPrice', max);
      }

      const response = await get(`products/filter/price?${params.toString()}`);
      console.log('Price filter response:', response);

      if (response && response.data) {
        setFilteredProducts(response.data);
        setProducts(response.data); // Cập nhật danh sách sản phẩm
      } else {
        console.error('Error from price filter API:', response?.message || 'No data');
        setFilteredProducts([]);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products by price range:', error);
      setFilteredProducts([]);
      setProducts([]);
    }
  };

  // Hàm lấy dữ liệu theo tiêu chí sắp xếp
  const fetchProductsBySortOption = async () => {
    if (!sortOption) return; // Không gọi API nếu sortOption là null

    try {
      console.log('Fetching products by sort option:', sortOption);
      const params = new URLSearchParams();
      params.append('sortBy', sortOption);

      const response = await get(`products/sort?${params.toString()}`);
      console.log('Sort response:', response);

      if (response && response.status && response.data) {
        if (filteredProducts.length > 0) {
          // Chỉ sắp xếp filteredProducts nếu đã có
          setProducts(
            response.data.filter((product) =>
              filteredProducts.some((filtered) => filtered.id === product.id)
            )
          );
        } else {
          setProducts(response.data); // Nếu không có lọc giá, dùng danh sách đã sắp xếp
        }
      } else {
        console.error('Error from sort API:', response?.message || 'No data');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products by sort:', error);
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
              placeholder="Chọn khoảng giá"
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