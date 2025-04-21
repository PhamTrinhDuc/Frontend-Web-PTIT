import React, { useState, useEffect } from 'react';
import './ShowProduct.scss';
import CardProduct from '../CardProduct'
import {Row, Col} from 'antd'; 
import PanigationProduct from "../PanigationProduct";


function ShowProduct({products, numOfProduct}) {
  

  return (
    <>
      <div className='products-container'>

        <PanigationProduct products={products} numOfProduct={numOfProduct} />
      </div>
    </>
  );
}

export default ShowProduct;