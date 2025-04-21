import React, { useState } from 'react';
import { Row, Col, Button} from 'antd';
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import PaginationProduct from '../../components/PanigationProduct';
import CardProduct from '../CardProduct'; // Giả định bạn đã có component này
import './ProductRelated.scss';

const ProductRelated = ({products = [], pageSize, currentPage, totalPages, onPageChange, loading}) => {

  return (
    <div className="related-container">
      <div className='related-title'>
          <TbRectangleVerticalFilled className="icon"/>
          <h1>Related Products</h1>
      </div>
      <PaginationProduct
        products={products}
        pageSize={pageSize}
        totalPages={totalPages}
        currentPage={currentPage}
        loading={loading}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProductRelated;