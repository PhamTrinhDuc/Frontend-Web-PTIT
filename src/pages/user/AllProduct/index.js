import React from 'react';
import { useState, useEffect} from 'react';
import useAllProduct from '../../../hook/useAllProduct';
import FilterSetion from '../../../components/FilterCommon';
import CategoriesHeader from '../../../components/CategoriesHeader';
import ShowProduct from '../../../components/ShowProduct';
import Loading from '../../../components/Loading';
import './AllProduct.scss';


function AllProduct() {
  // const navigate = useNavigate();
  // const { products, loading, error } = useAllProduct();
  // if (loading) return <Loading loading={loading} />;
  // if (error) {
  //   navigate("/error");
  //   return null;
  // }

  const [products, setProducts] = useState([]);
  const handleProductsChange = (newProducts) => {
    setProducts(newProducts);
  };

  return (
    <>
      <div className='products-container'>
        <CategoriesHeader />

        <FilterSetion onProductsChange={handleProductsChange}/>

        <ShowProduct products={products} />

        <div className='product-container'>
        </div>
      </div>
    </>
  )
}

export default AllProduct;