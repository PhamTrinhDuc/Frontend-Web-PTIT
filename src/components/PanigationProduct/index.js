import { useState } from 'react';
import { Row, Col, Pagination, Empty } from 'antd';
import CardProduct from '../CardProduct';
import './PanigationProduct.scss';

const PanigationProduct = ({ products = [], numOfProduct = 4 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = numOfProduct;

  const totalProducts = products.length;
  const currentProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="navigation-container">
      <div className="carousel-container">
        {currentProducts.length > 0 ? (
          <Row gutter={[16, 16]} className="navigation-items">
            {currentProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={6}>
                <CardProduct product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No products available" />
        )}
      </div>

      {totalProducts > 0 && (
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={totalProducts}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default PanigationProduct;