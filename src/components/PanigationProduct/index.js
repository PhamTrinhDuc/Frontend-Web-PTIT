import { useState } from 'react';
import { Row, Col, Pagination } from 'antd';
import CardProduct from '../CardProduct'; // Đảm bảo import đúng
import './PanigationProduct.scss'; // Import file CSS

const PanigationProduct = ({ products = [], numOfProduct = 4 }) => {
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

    <div className="navigation-container">
      <div className="carousel-container">
        <Row gutter={[16, 16]} className="navigation-items">
          {currentProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={6}>
              <CardProduct product={product} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={totalProducts}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false} // Ẩn tùy chọn thay đổi số lượng sản phẩm trên trang
        />
      </div>
    </div>

  );
};

export default PanigationProduct;