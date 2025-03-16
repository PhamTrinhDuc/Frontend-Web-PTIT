import React, { useState } from 'react';
import CardProduct from '../../../components/admin/CardProduct';
import './ManageProduct.scss';
import HeaderMangeProduct from '../../../components/admin/HeaderManageProduct';

function ManageProduct({products = [], numOfProduct = 4}) {
  return (
    <>
      <HeaderMangeProduct />
      <div className="navigation-container">
        <div className="carousel-container">
         <CardProduct products={products} />
        </div>
      </div>
    </>
  );
};

export default ManageProduct;