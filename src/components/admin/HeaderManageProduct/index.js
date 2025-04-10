import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { CiFilter } from 'react-icons/ci';
import { TiExportOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useCategories } from '../../../hook/useCategories';
import Loading from '../../Loading';
import './HeaderMangeProduct.scss';

function HeaderMangeProduct({ products, onFilterByCategory }) {
  const navigate = useNavigate();
  const { categoriesList, loading, error } = useCategories();

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate('/error');
    return null;
  }

  // Tạo menu cho Dropdown (thêm tùy chọn "All")
  const categoryMenu = (
    <Menu>
      {categoriesList.map((category) => (
        <Menu.Item
          key={category.id}
          onClick={() => onFilterByCategory(category.slug)}
        >
          {/* <Link to={`/admin/category/${category.name}`}> */}
          <Link>
            <span style={{ marginRight: 8 }}></span>
            {category.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  // Hàm xuất file Excel
  const handleExport = () => {
    const data = products.map((product) => ({
      ID: product.id,
      Name: product.name,
      Price: product.price,
      Discount: product.discount,
      QuantityStock: product.quantityStock,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'products.xlsx');
  };

  return (
    <div className="header-manage">
      <h2>Manage Product</h2>

      <div className="button-manage">
        <Button
          type="primary"
          icon={<FaPlus />}
          className="button-icon"
          onClick={() => navigate('/admin/add-product')}
        >
          NEW
        </Button>
        <Dropdown overlay={categoryMenu} trigger={['click']}>
          <Button type="primary" icon={<CiFilter />} className="button-icon">
            CATEGORY
          </Button>
        </Dropdown>
        <Button
          type="primary"
          icon={<TiExportOutline />}
          className="button-icon"
          onClick={handleExport}
        >
          EXPORT
        </Button>
      </div>
    </div>
  );
}

export default HeaderMangeProduct;