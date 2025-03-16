import React, { useState } from 'react';
import { Button } from 'antd';
import { FaPlus } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { TiExportOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

import './HeaderManageOrder.scss'

function HeaderManageOrder() {
  const navigate = useNavigate();

  return (
    <div className='header-manage'>
        <h2>View Order</h2>

        <div className='button-manage'>
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

export default HeaderManageOrder;