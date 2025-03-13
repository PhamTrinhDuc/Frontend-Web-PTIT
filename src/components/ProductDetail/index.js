import React, { useState, useRef } from 'react';
import { Rate } from 'antd';
import { Row, Col, Card, Radio, Select, Button, Image, Typography,Divider } from 'antd';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { CarOutlined, SyncOutlined } from '@ant-design/icons';
import './ProductDetail.scss';


const { Title, Link, Text, Paragraph } = Typography;
const { Option } = Select;

const Rating = ({props}) => {
  const reviewSectionRef = useRef(null);
  const {rating, reviews, inStock} = props; // Example rating (4 out of 5)

  // Function to scroll to the review section
  const scrollToReviews = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="rating-container">
      <div className="rating-section" onClick={scrollToReviews}>
        <Rate
          disabled
          allowHalf
          defaultValue={rating}
          count={5}
        />
        <span className="review-count" onClick={scrollToReviews}>
          ({reviews} Reviews)
        </span>

        <span className="stock-status">
          {' | '}
          {inStock > 0 ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </span>

      </div>
      {/* <div ref={reviewSectionRef} className="review-section">
        <h2>Reviews Section</h2>
        <p>This is where the reviews would be displayed.</p>
      </div> */}
    </div>
  );
};


const ProductDetail = ({ product }) => {
  const {
    name,
    price,
    images,
    description,
    colors,
    sizes ,
    inStock,
    reviews,
    rating,
  } = product;

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]); // Mặc định là 'M'
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(images[0]); // State để theo dõi ảnh chính

  const handleThumbnailClick = (img) => {
    setMainImage(img); // Cập nhật ảnh chính khi click vào ảnh phụ
  };

  return (
    <>
    <Row gutter={[16, 16]} className="product-detail">
      {/* Cột trái: Hình ảnh sản phẩm */}
      <Col xs={24} md={12} lg={12}>
        <Card className="product-image-card">
          <Image
            src={mainImage}
            alt={name}
            className="main-image"
            style={{ width: '100%', height: 400 }} // Đặt chiều cao cố định
          />
          <Row gutter={[8, 8]} className="thumbnail-row">
            {images.slice(1).map((img, index) => (
              <Col key={index} xs={6}>
                <Image
                  src={img}
                  alt={`${name} thumbnail ${index + 1}`}
                  className="thumbnail-image"
                  preview={false}
                  onClick={() => handleThumbnailClick(img)}
                />
              </Col>
            ))}
          </Row>
        </Card>
      </Col>

      {/* Cột phải: Thông tin sản phẩm */}
      <Col xs={24} md={12} lg={12}>
        <Card className="product-info-card">
          <Title level={3}>{name}</Title>
          <Rating props={product} />
          <Title level={2} className="product-price">
            {price.toLocaleString()}đ
          </Title>
          <Paragraph className="product-description">{description}</Paragraph>

          {/* Tùy chọn màu sắc */}
          <div className="color-options">
            <Text strong className='title-option'>Colours:</Text>
            <Radio.Group
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="color-radio-group"
            >
              {colors.map((color) => (
                <Radio key={color} value={color}>
                  {color}
                </Radio>
              ))}
            </Radio.Group>
          </div>

          {/* Số lượng */}
          <div className="quantity-options">
            <Text strong className='title-option'>Quantity:</Text>
            <Button
              icon={<MinusOutlined />}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="quantity-button"
            />
            <span className="quantity-value">{quantity}</span>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setQuantity(quantity + 1)}
              className="quantity-button"
            />
          </div>

          {/* Nút mua hàng */}
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            size="large"
            className="buy-button"
          >
            Buy Now
          </Button>

          {/* Thông tin giao hàng và trả hàng */}
          <div className="delivery-info">
            <div className="delivery-section">
              <CarOutlined className="delivery-icon" />
              <div className="delivery-text">
                <Text strong>Free Delivery</Text>
                <br />
                <Link>Enter your postal code for Delivery Availability</Link>
              </div>
            </div>

            {/* Divider */}
            <Divider className="delivery-divider" />

            {/* Return Delivery Section */}
            <div className="delivery-section">
              <SyncOutlined className="delivery-icon" />
              <div className="delivery-text">
                <Text strong>Return Delivery</Text>
                <br />
                <Text>Free 30 Days Delivery Returns. <Link>Details</Link></Text>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    </>
  );
};

export default ProductDetail;