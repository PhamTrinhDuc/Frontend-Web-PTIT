import React, { useState, useEffect } from 'react';
import './ShowProduct.scss';
import CardProduct from '../CardProduct'
import {Row, Col} from 'antd'; 
import PanigationProduct from "../PanigationProduct";


function ShowProduct({products}) {
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

        <PanigationProduct products={products} numOfProduct={16} />
      </div>
    </>
  );
}

export default ShowProduct;