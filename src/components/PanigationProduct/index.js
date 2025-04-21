import { useState } from 'react';
import { Row, Col, Pagination, Empty } from 'antd';
import CardProduct from '../CardProduct';
import './PanigationProduct.scss';

const PanigationProduct = ({ products = [], pageSize, currentPage, totalPages, onPageChange, loading }) => {
  return (
    <div className="navigation-container">
      <Row gutter={[16, 16]} className="navigation-items">
        {loading
          ? Array(pageSize).fill(0).map((_, idx) => (
              <Col key={idx} xs={24} sm={12} md={6}>
                <div className="skeleton-card" /> {/* hoặc dùng Skeleton AntD */}
              </Col>
            ))
          : products.length > 0
            ? products.map((product) => (
                <Col key={product.id} xs={24} sm={12} md={6}>
                  <CardProduct product={product} />
                </Col>
              ))
            : <Empty description="No products available" />}
      </Row>

      {totalPages > 1 && (
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={totalPages * pageSize}
            pageSize={pageSize}
            onChange={onPageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default PanigationProduct;