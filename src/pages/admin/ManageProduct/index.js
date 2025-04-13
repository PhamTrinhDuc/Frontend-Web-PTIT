import React, { useState, useNavigate } from 'react';
import CardProduct from '../../../components/admin/CardProduct';
import './ManageProduct.scss';
import HeaderMangeProduct from '../../../components/admin/HeaderManageProduct';
import useAllProduct from '../../../hook/useAllProduct';
import {get} from '../../../utils/requests';

function ManageProduct({ numOfProduct = 4 }) {
  const { allProducts, loading, error } = useAllProduct();
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    if (allProducts) {
      setProducts(allProducts);
    }
  }, [allProducts]);
  const filterProductsByCategory = async (category) => {
    try {
      const response = await get(`products/${category}`);
      setProducts(response.data || []);
    } catch (err) {
      setProducts([]);
    }
  };

  return (
    <>
      <HeaderMangeProduct
        products={products}
        onFilterByCategory={filterProductsByCategory}
      />
      <div className="navigation-container">
        <div className="carousel-container">
          <CardProduct products={products.slice(0, numOfProduct)} />
        </div>
      </div>
    </>
  );
}

export default ManageProduct;