
import { Row, Col } from 'antd';
import { useState } from 'react';
import './FlashSale.scss';
import CardProduct from '../CardProduct';
import CountdownTimer from './CountdownTimer';

function FlashSale() {
  // data giả định, sau này gọi APi đến backend
  const products = [
    {
      id: 1,
      name: 'Toy clm chiil game HY-G93',
      originalPrice: '$168.00',
      salePrice: '$120.00',
      rating: 5,
      reviews: 74,
      discountPercentage: 5,
      image: 'https://www.shutterstock.com/image-photo/antalya-turkey-september-14-2023-260nw-2361564459.jpg',
    },
    {
      id: 2,
      name: 'San palnt AK-900 Wired',
      originalPrice: '$160.00',
      salePrice: '$60.00',
      rating: 5,
      reviews: 78,
      discountPercentage: 10,
      image: 'https://www.shutterstock.com/image-photo/antalya-turkey-september-14-2023-260nw-2361564459.jpg',
    },
    {
      id: 3,
      name: 'Toy clm chiil game HY-G93',
      originalPrice: '$168.00',
      salePrice: '$120.00',
      rating: 5,
      reviews: 90,
      discountPercentage: 12,
      image: 'https://www.shutterstock.com/image-photo/antalya-turkey-september-14-2023-260nw-2361564459.jpg',
    },
    {
      id: 4,
      name: 'Toy clm chiil game HY-G93',
      originalPrice: '$168.00',
      salePrice: '$120.00',
      rating: 5,
      reviews: 74,
      discountPercentage: 5,
      image: 'https://www.shutterstock.com/image-photo/antalya-turkey-september-14-2023-260nw-2361564459.jpg',
    }
  ];

  return (
    <>
      <div className='flash-sale'>
        <CountdownTimer />

        <Row className="product-container" gutter={[16, 16]} justify="center">
          {products.map((product) => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <CardProduct product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default FlashSale;