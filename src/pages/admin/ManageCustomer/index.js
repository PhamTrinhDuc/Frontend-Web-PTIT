
import React from 'react';
import CardCustomer from '../../../components/admin/CardCustomer.scss';
import HeaderMange from '../../../components/admin/HeaderManage';

function ManageCustomer() {
  return (
    <div>
      <HeaderMange title="Manage Customers" />
      <CardCustomer />
    </div>
  );
}

export default ManageCustomer;