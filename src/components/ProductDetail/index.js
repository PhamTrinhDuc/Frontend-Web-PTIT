import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rate } from 'antd';
import { Row, Col, Card, Radio, Button, Image, Typography, Divider } from 'antd';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { CarOutlined, SyncOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../slices/wishlistSlice';
import { addToCart } from '../../slices/cartSlice';
import './ProductDetail.scss';

const { Title, Link, Text, Paragraph } = Typography;

const Rating = ({ quantityStock }) => {
  const reviewSectionRef = useRef(null);
  const rating = 4.5; // Giá trị đánh giá mặc định
  const reviews = 120; // Số lượng đánh giá mặc định
  const scrollToReviews = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="rating-container">
      <div className="rating-section" onClick={scrollToReviews}>
        <Rate disabled allowHalf defaultValue={rating} count={5} />
        <span className="review-count" onClick={scrollToReviews}>
          ({reviews} Reviews)
        </span>
        <span className="stock-status">
          {' | '}
          {quantityStock > 0 ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </span>
      </div>
    </div>
  );
};

const ProductDetail = ({ product }) => {
  const {
    name,
    description,
    imagePaths,
    price,
    specification,
    quantityStock,
  } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items) || [];
  const isFavorite = wishlistItems.some(item => item.productId === product.id);

  // State để lưu các lựa chọn của từng thông số
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initialOptions = {};
    Object.keys(specification || {}).forEach((key) => {
      const value = specification[key];
      initialOptions[key] = Array.isArray(value) && value.length > 0 ? value[0] : value;
    });
    return initialOptions;
  });
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(
    imagePaths?.length > 0 ? imagePaths[0] : 'defaultImage.jpg'
  );

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, selectedOptions, quantity })); // Thêm thông số đã chọn vào giỏ hàng
    navigate('/cart');
  };

  // Hàm xử lý thay đổi lựa chọn thông số
  const handleOptionChange = (key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleToggleWishlist = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (isFavorite) {
      dispatch(removeFromWishlist({ userId: user.id, productId: product.id }));
    } else {
      dispatch(addToWishlist({ userId: user.id, productId: product.id }));
    }
  };

  return (
    <Row gutter={[16, 16]} className="product-detail">
      {/* Cột trái: Hình ảnh sản phẩm */}
      <Col xs={24} md={12} lg={12}>
        <Card className="product-image-card">
          <Image
            src={mainImage}
            alt={name}
            className="main-image"
            style={{ width: '100%', height: 400 }}
          />
          <Row gutter={[8, 8]} className="thumbnail-row">
            {imagePaths.slice(0).map((img, index) => (
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
          <Rating  quantityStock={quantityStock} />
          <Title level={2} className="product-price">
            {price.toLocaleString()} $
          </Title>
          <Paragraph className="product-description">{description}</Paragraph>

          {/* Hiển thị động các thông số từ specification */}
          {specification && Object.keys(specification).length > 0 && (
            <div className="specification-options">
              {Object.entries(specification).map(([key, value]) => (
                <div key={key} className="option-group">
                  <Text strong className="title-option">
                  {key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}                  
                  </Text>
                  {Array.isArray(value) ? (
                    <Radio.Group
                      value={selectedOptions[key]}
                      onChange={(e) => handleOptionChange(key, e.target.value)}
                      className="option-radio-group"
                    >
                      {value.map((option) => (
                        <Radio key={option} value={option}>
                          {option}
                        </Radio>
                      ))}
                    </Radio.Group>
                  ) : (
                    <Text>{value}</Text> // Hiển thị giá trị đơn nếu không phải mảng
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Nút mua hàng */}
          <div className="product-actions" style={{ display: 'flex', gap: '10px' }}>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              className="buy-button"
              onClick={handleBuyNow}
              style={{ flex: 1 }}
            >
              Buy Now
            </Button>
            <Button
              size="large"
              icon={isFavorite ? <HeartFilled style={{ color: '#DB4444' }} /> : <HeartOutlined />}
              onClick={handleToggleWishlist}
              className="wishlist-detail-button"
            />
          </div>

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
            <Divider className="delivery-divider" />
            <div className="delivery-section">
              <SyncOutlined className="delivery-icon" />
              <div className="delivery-text">
                <Text strong>Return Delivery</Text>
                <br />
                <Text>
                  Free 30 Days Delivery Returns. <Link>Details</Link>
                </Text>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetail;