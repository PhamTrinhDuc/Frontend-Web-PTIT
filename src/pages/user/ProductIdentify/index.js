import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import useProductsByCategory from '../../../hook/useProductsByCategory';
import FilterSetion from '../../../components/FilterCommon';
import CategoriesHeader from '../../../components/CategoriesHeader';
import ShowProduct from '../../../components/ShowProduct';
import './ProductIdentify.scss';

function ProductIdentify() {
  const { categorySlug } = useParams(); // URL: /products/{categorySlug}
  const navigate = useNavigate();

  // Gọi API để lấy sản phẩm dựa trên categorySlug
  const { products, loading, error } = useProductsByCategory(categorySlug);

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

        <ShowProduct products={products}/>

        <div className='product-container'>
        </div>
      </div>
    </>
  )
}

export default ProductIdentify;