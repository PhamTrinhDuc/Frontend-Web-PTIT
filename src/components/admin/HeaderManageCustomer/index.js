import React, { useState } from 'react';
import { Button } from 'antd';
import { CiFilter } from "react-icons/ci";
import { TiExportOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

import './HeaderManageCustomer.scss'

function HeaderManageCustomer() {
  const navigate = useNavigate();

  return (
    <div className='header-manage'>
        <h2>Manage Customer</h2>

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

export default HeaderManageCustomer;