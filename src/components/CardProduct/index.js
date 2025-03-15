import { Card, Badge, Rate, Button, Alert} from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { addToCart } from '../../slices/cartSlice';
import './Card.scss';

// https://grok.com/chat/dceab0b3-d8ec-4277-8959-978a792d3211?referrer=grok

const { Text } = Typography;

function CardProduct({product}) {
  const [isHovered, setIsHovered] = useState(false); // Trạng thái hover
  const [showAlert, setShowAlert] = useState(false); // State để hiển thị Alert  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan truyền lên div
    dispatch(addToCart(product));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  }
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
      <div className="card-container"
      onMouseEnter={() => setIsHovered(true)} // Khi hover vào card
      onMouseLeave={() => setIsHovered(false)} // Khi rời khỏi card
      onClick={handleViewDetail}
      >
        <Card 
          className="card-image"
          cover={
            <div className="product-image-container">
              <Badge.Ribbon text={`-${product.discountPercentage} %`} color="#DB4444" className="sale-badge">
                <img src={product.image} alt={product.name} className="product-image" />
              </Badge.Ribbon>
            </div>
          }
          actions={
            isHovered ?
            [
              <Button key="add-to-cart" type="primary" className="product-action-button"
              onClick={handleAddToCart}>Add to cart
              </Button>
            ]: [
              <HeartOutlined key="heart" className="product-action-icon" />,
              <EyeOutlined key="view" className="product-action-icon" />
            ]
        }
        >
        </Card>
        <div className='card-content' onClick={handleViewDetail}>
          <h3 className='product-title'>{product.name}</h3>
          <div className='product-price'>
            <Text className='original-price'>{product.originalPrice}</Text>
            <Text className='sale-price'>{product.salePrice }</Text>
          </div>
        </div>

        <div>
          <div className='product-rating'>
            <Rate disabled defaultValue={product.rating} />
            <Text className='review-count'>({product.reviews})</Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardProduct;