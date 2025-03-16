import React, { useState } from 'react';
import { Button } from 'antd';
import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { TiExportOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

import './HeaderMangeProduct.scss'

function HeaderMangeProduct() {
  const navigate = useNavigate();

  return (
    <div className='header-manage'>
        <h2>Manage Product</h2>

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
  );
}

export default HeaderMangeProduct;