import React, { useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { TiExportOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './HeaderManageOrder.scss'

function HeaderManageOrder({orders, onFilterByStatus}) {
  const navigate = useNavigate();

  const filterMenu = (
    <Menu
      onClick={(e) => onFilterByStatus(e.key)}
      items={[
        {
          key: 'pending',
          label: 'Pending',
        },
        {
          key: 'processing',
          label: 'Processing',
        },
      ]}
    />
  );

  // Hàm xuất file Excel
  const handleExport = () => {
    const data = orders.map((order) => ({
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    XLSX.writeFile(workbook, 'products.xlsx');
  };

  return (
    <div className='header-manage'>
        <h2>View Order</h2>
        <div className='button-manage'>
          <Dropdown overlay={filterMenu} trigger={['click']}>
            <Button type="primary" icon={<CiFilter />} className="button-icon">
              FILTER
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

export default HeaderManageOrder;