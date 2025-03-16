
import React from 'react';
import CardOrder from '../../../components/admin/CardOrder';
import HeaderManageOrder from '../../../components/admin/HeaderManageOrder';
import './ViewOrder.scss';



function ViewOrder() {
  return (
    <>
      <HeaderManageOrder />
      <CardOrder />
    </>
  );
}

export default ViewOrder;