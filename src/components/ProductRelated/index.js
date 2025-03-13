import React, { useState } from 'react';
import { Row, Col, Button} from 'antd';
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CardProduct from '../CardProduct'; // Giả định bạn đã có component này
import './ProductRelated.scss';

const ProductRelated = ({products}) => {
  // Mock data cho related items
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 4; // Số sản phẩm trên mỗi trang

  // Tính toán sản phẩm hiển thị
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    currentIndex * productsPerPage,
    (currentIndex + 1) * productsPerPage
  );
  // Xử lý chuyển trang
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  return (
    <div className="related-container">
      <div className='related-title'>
          <TbRectangleVerticalFilled className="icon"/>
          <h1>Related Products</h1>
      </div>
      <div className="carousel-container">
        <Button icon={<LeftOutlined />} className="carousel-arrow left-arrow" onClick={handlePrev} />
        <Row gutter={[16, 16]} className="related-items">
          {currentProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={6}>
              <CardProduct
                product = {product}
              />
            </Col>
          ))}
        </Row>
        <Button icon={<RightOutlined />} className="carousel-arrow right-arrow" onClick={handleNext} />
      </div>
      <div className="pagination-dots">
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductRelated;