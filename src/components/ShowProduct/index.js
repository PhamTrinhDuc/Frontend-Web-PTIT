import React, { useState, useEffect } from 'react';
import './ShowProduct.scss';
import CardProduct from '../CardProduct'
import {Row, Col} from 'antd'; 
import products from '../../utils/mock_data';
import NavigationProduct from "../NavigationProduct";


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

        <NavigationProduct products={products} numOfProduct={16} />
      </div>
    </>
  );
}

export default ShowProduct;