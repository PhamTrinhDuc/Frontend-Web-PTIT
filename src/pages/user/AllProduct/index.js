import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AllProduct.scss';
import useAllProductVariant from '../../../hook/useAllProductVariant';
import FilterSetion from '../../../components/FilterCommon';
import CategoriesHeader from '../../../components/CategoriesHeader';
import ShowProduct from '../../../components/ShowProduct';
import Loading from '../../../components/Loading';


function AllProduct() {
  const navigate = useNavigate();
  const { products, loading, error } = useAllProductVariant();
  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate("/error");
    return null;
  }


  return (
    <>
      <div className='products-container'>
        <CategoriesHeader />

        <FilterSetion />

        <ShowProduct products={products} />

        <div className='product-container'>
        </div>
      </div>
    </>
  )
}

export default AllProduct;