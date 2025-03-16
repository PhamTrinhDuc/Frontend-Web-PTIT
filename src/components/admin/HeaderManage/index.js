import { Button } from 'antd';
import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { TiExportOutline } from "react-icons/ti";
import './HeaderManage.scss';
import { useNavigate } from 'react-router-dom';


const HeaderManage = ({title}) => {
  const navigate = useNavigate();
  return (
    <>
    <div className='header-manage'>
      <h2>{title}</h2>

      <div className='button-manage'>
        <Button type="primary" icon={<FaPlus />} className='button-icon' 
        onClick={() => navigate('/admin/add-product')}>
          NEW
        </Button>
        <Button type="primary" icon={<CiFilter />} className='button-icon' >
          FILTER
        </Button>
        <Button type="primary" icon={<TiExportOutline />} className='button-icon' >
          EXPORT
        </Button>
      </div>
    </div>
      {/* <div className="navigation-container">
        <div className="carousel-container">
          <Row gutter={[16, 16]} className="navigation-items">
            {currentItems.map((item) => (
              <Col key={item.id} span={24}>
                Thông tin sản phẩm
              </Col>
            ))}
          </Row>
        </div>

        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={totalItem}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false} // Ẩn tùy chọn thay đổi số lượng sản phẩm trên trang
          />
        </div>
      </div> */}
    </>
  );
};

export default HeaderManage;