import React, { useState } from 'react';
import { Row, Col, Button} from 'antd';
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import PaginationProduct from '../../components/PanigationProduct';
import CardProduct from '../CardProduct'; // Giả định bạn đã có component này
import './ProductRelated.scss';

const ProductRelated = ({products}) => {

  return (
    <div className="related-container">
      <div className='related-title'>
          <TbRectangleVerticalFilled className="icon"/>
          <h1>Related Products</h1>
      </div>
      <PaginationProduct products={products} numOfProduct={4}/>
    </div>
  );
};

export default ProductRelated;