import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import useProductsByCategory from '../../../hook/useProductsByCategory';
import FilterSection from '../../../components/FilterCommon';
import CategoriesHeader from '../../../components/CategoriesHeader';
import { useSearchParams } from 'react-router-dom';
import { numPageProduct } from '../../../utils/variable';
import './ProductIdentify.scss';

import PanigationProduct from '../../../components/PanigationProduct';

function ProductIdentify() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = numPageProduct;
  const [filters, setFilters] = useState({ priceRange: null, sortOption: null });

  const handlePaginationChange = (newPage, newPageSize) => {
    setSearchParams({ page: newPage.toString(), pageSize: newPageSize.toString() });
  };

  const handleFilterChange = ({ priceRange, sortOption }) => {
    setFilters({ priceRange, sortOption });
  };

  const { products, loading, error, totalPages } = useProductsByCategory({
    categorySlug,
    page,
    pageSize,
    priceRange: filters.priceRange,
    sortOption: filters.sortOption,
  });

  if (loading) return <Loading loading={loading} />;
  if (error) return <Navigate to="/error" />;

  return (  
    <div className="products-container">
      <CategoriesHeader />
      <FilterSection
        // onProductsChange={handleProductsChange}
        onFilterChange={handleFilterChange}
      />
      <PanigationProduct
        products={products}
        pageSize={pageSize}
        totalPages={totalPages}
        currentPage={page}
        loading={loading}
        onPageChange={(page) => handlePaginationChange(page, pageSize)}
      />
    </div>
  );
}

export default ProductIdentify;