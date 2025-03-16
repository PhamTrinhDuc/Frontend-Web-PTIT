import React, { useState } from 'react';
import { Row, Col, Pagination } from 'antd';
import CardProduct from '../../../components/admin/CardProduct';
import HeaderManage from '../../../components/admin/HeaderManage';
import products from '../../../utils/mock_data';

function ManageProduct({container, products = [], numOfProduct = 4}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = numOfProduct; // Số sản phẩm mỗi trang

  const totalProducts = products.length; // Tổng số sản phẩm

  const currentProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <HeaderManage title="Mange Product" />
      <div className="navigation-container">
        <div className="carousel-container">
         <CardProduct products={products} />
        </div>
      </div>
    </>
  );
};

export default ManageProduct;