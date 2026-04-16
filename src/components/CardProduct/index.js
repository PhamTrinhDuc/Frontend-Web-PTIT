import { Card, Badge, Rate, Button, Alert } from 'antd';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { HeartOutlined, HeartFilled, EyeOutlined } from '@ant-design/icons';
import { addToCart } from '../../slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../slices/wishlistSlice';
import './Card.scss';

const { Text } = Typography;

function CardProduct({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items) || [];
  const isFavorite = wishlistItems.some(item => item.productId === product.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền (bubbling) lên các thành phần cha.
    dispatch(addToCart(product));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  };

  const handleViewDetail = () => {
    navigate(`/product-detail/${product.id}`);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
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
        {product.discount > 0 ? (
          <Badge.Ribbon text={`-${product.discount}%`} color="#DB4444" className="sale-badge">
            <Card
              className="card-image"
              hoverable
              cover={
                <div className="product-image-container">
                  <img src={product.imagePaths?.[0] || "default-image.jpg"} alt={product.name} className="product-image" />
                  <div className="product-wishlist-icon" onClick={handleToggleWishlist}>
                    {isFavorite ? (
                      <HeartFilled style={{ color: '#DB4444' }} />
                    ) : (
                      <HeartOutlined />
                    )}
                  </div>
                  {isHovered && (
                    <Button
                      type="primary"
                      className="product-action-button"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </Button>
                  )}
                </div>
              }
            >
              <div className="card-content-inner">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">
                  <Text className="sale-price">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </Text>
                  <Text className="original-price">${product.price}</Text>
                </div>
              </div>
            </Card>
          </Badge.Ribbon>
        ) : (
          <Card
            className="card-image"
            hoverable
            cover={
              <div className="product-image-container">
                <img src={product.imagePaths?.[0] || "default-image.jpg"} alt={product.name} className="product-image" />
                <div className="product-wishlist-icon" onClick={handleToggleWishlist}>
                  {isFavorite ? (
                    <HeartFilled style={{ color: '#DB4444' }} />
                  ) : (
                    <HeartOutlined />
                  )}
                </div>
                {isHovered && (
                  <Button
                    type="primary"
                    className="product-action-button"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                )}
              </div>
            }
          >
            <div className="card-content-inner">
              <h3 className="product-title">{product.name}</h3>
              <div className="product-price">
                <Text className="sale-price">${product.price}</Text>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}

export default CardProduct;