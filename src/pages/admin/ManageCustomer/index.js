
import React from 'react';
import CardCustomer from '../../../components/admin/CardCustomer';
import HeaderManageCustomer from '../../../components/admin/HeaderManageCustomer';
import { Button } from 'antd';
import { CiFilter } from "react-icons/ci";
import { TiExportOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';


function ManageCustomer() {
  return (
    <div>
      <HeaderManageCustomer />
      <CardCustomer />
    </div>
  );
}

export default ManageCustomer;