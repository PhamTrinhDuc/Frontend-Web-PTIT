import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSetion from '../../../components/FilterCommon';
import CategoriesHeader from '../../../components/CategoriesHeader';
import Loading from '../../../components/Loading';
import { numPageProduct } from '../../../utils/variable';
import PanigationProduct from '../../../components/PanigationProduct';
import './AllProduct.scss';
import useSearchProduct from '../../../hook/useSearchProduct';

function AllProduct() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = numPageProduct;
  
  const { products: productsSearch, loading, error, totalPages } = useSearchProduct({ page, pageSize, keyword });
  console.log('productsSearch', productsSearch);
  useEffect(() => {
    if (productsSearch) {
      setProducts(productsSearch);
    }
  }, [productsSearch]);

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  const handleProductsChange = (newProducts) => {
    if (Array.isArray(newProducts)) {
      setProducts(newProducts);
    }
  };

  if (loading) return <Loading loading={loading} />;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="products-container">
      <CategoriesHeader />
      <FilterSetion onProductsChange={handleProductsChange} />
      <PanigationProduct
        products={products}
        pageSize={pageSize}
        totalPages={totalPages}
        currentPage={page}
        loading={loading}
        onPageChange={handlePaginationChange}
      />
    </div>
  );
}

export default AllProduct;