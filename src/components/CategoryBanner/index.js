import { TbRectangleVerticalFilled } from "react-icons/tb";
import { Link } from 'react-router-dom';
import {categoryIcons} from '../../utils/icons';
import Loading from '../../components/Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { useCategories } from '../../hook/useCategories';

import './CategoryBanner.scss';

function CategoryBanner() {
  const [currentPage, setCurrentPage] = useState(0); // Quản lý trang hiện tại
  const { categoriesList, loading, error } = useCategories();
  const itemsPerPage = 6; // Số danh mục trên mỗi trang
  const navigate = useNavigate();

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate("/error");
    return null;
  }
  // Lấy dữ liệu danh mục của trang hiện tại
  const startIndex = currentPage * itemsPerPage;
  const displayedCategories = categoriesList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="category-container">
        <div className="category-title">
          <TbRectangleVerticalFilled className="icon" />
          <h1>Categories</h1>
        </div>
        <h2>Browse By Category</h2>

        <Row className="category-row" gutter={[16, 16]} justify="center">
          {displayedCategories.map((category) => (
            <Col xs={24} sm={12} md={8} lg={4} key={category.id}>
              <Link to={`products/${category.slug}`}>
                <div className="category-item">
                  {categoryIcons[category.slug]}
                  <h3>{category.name}</h3>
                </div>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Nút Next & Back */}
        <div className="pagination-buttons">
          <Button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} 
            disabled={currentPage === 0}
          >
            Back
          </Button>

          <Button 
            onClick={() => setCurrentPage((prev) => (prev + 1 < Math.ceil(categoriesList.length / itemsPerPage) ? prev + 1 : prev))}
            disabled={startIndex + itemsPerPage >= categoriesList.length}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default CategoryBanner;