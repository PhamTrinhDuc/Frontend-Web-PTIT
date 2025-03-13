import React, { useState, useEffect } from 'react';
import './ShowProduct.scss';
import CardProduct from '../CardProduct'
import {Row, Col} from 'antd'; 
import products from '../../utils/mock_data';

function ShowProduct() {
  // const [products, setProducts] = useState([]);
  {/* Hàm lấy dữ liệu từ API */}
  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch('https://dummyjson.com/products');
  //     const data = await response.json();

  //     setProducts(data);
  //   }
  //   catch (error) {
  //     console.log('Error: ', error);
  //   }
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, []);


  return (
    <>
      <div className='products-container'>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={6} lg={6} xl={6}>
            <CardProduct product={product} />
          </Col>
        ))}
      </Row>
      </div>
    </>
  );
}

export default ShowProduct;