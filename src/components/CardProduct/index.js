import { Card, Badge, Rate, Button, Alert } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { addToCart } from '../../slices/cartSlice';
import './Card.scss';

const { Text } = Typography;

function CardProduct({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  };

  const handleViewDetail = () => {
    navigate(`/product-detail/${product.id}`);
  };

  return (
    <>
      {showAlert && (
        <Alert
          message={`${product.name} has been added to cart!`}
          type="success"
          showIcon
          className="cart-alert"
        />
      )}
      <div
        className="card-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleViewDetail}
      >
        <Card
          className="card-image"
          cover={
            <div className="product-image-container">
              <Badge.Ribbon text={`-${product.discount} $`} color="#DB4444" className="sale-badge">
              <img src={product.imagePaths?.[0] || "default-image.jpg"} alt={product.name} className="product-image" />
              </Badge.Ribbon>
            </div>
          }
          actions={[
            <HeartOutlined key="heart" className="product-action-icon" />,
            <EyeOutlined key="view" className="product-action-icon" />,
          ]}
        >
          {/* Nút Add to cart được đặt bên ngoài actions */}
          {isHovered && (
            <Button
              type="primary"
              className="product-action-button"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          )}
        </Card>
        <div className="card-content" onClick={handleViewDetail}>
          <h3 className="product-title">{product.name}</h3>
          <div className="product-price">
            <Text className="original-price">{product.price} $</Text>
            <Text className="sale-price">{product.price} $</Text>
          </div>
        </div>

        <div>
          <div className="product-rating">
            <Rate disabled defaultValue={product.rating} />
            <Text className="review-count">({product.reviews})</Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardProduct;