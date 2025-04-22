import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Radio, Typography } from 'antd';
import { priceRanges, sortOptions } from '../../utils/filter';
import './FilterCommon.scss';

const { Option } = Select;
const { Title } = Typography;

const FilterSetion = ({onFilterChange }) => {
  const [priceRange, setPriceRange] = useState(null);
  const [sortOption, setSortOption] = useState(null); // Đặt mặc định là null

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    onFilterChange?.({ priceRange: value, sortOption });
  };

  const handleSortOptionChange = (e) => {
    const value = e.target.value;
    setSortOption(e.target.value);
    onFilterChange?.({ priceRange, sortOption: value });
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