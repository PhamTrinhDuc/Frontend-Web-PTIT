import React, { useState, useEffect } from 'react';
import './ShowProduct.scss';
import CardProduct from '../CardProduct'
import {Row, Col} from 'antd'; 
import PanigationProduct from "../PanigationProduct";


function ShowProduct({products}) {

  return (
    <>
      <div className='products-container'>

        <PanigationProduct products={products} numOfProduct={16} />
      </div>
    </>
  );
}

export default ShowProduct;