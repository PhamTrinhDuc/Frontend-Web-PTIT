import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import useProductsByCategory from '../../../hook/useProductsByCategory';
import FilterSection from '../../../components/FilterCommon';
import CategoriesHeader from '../../../components/CategoriesHeader';
import { useSearchParams } from 'react-router-dom';
// import ShowProduct from '../../../components/ShowProduct';
import { numPageProduct } from '../../../utils/variable';
import './ProductIdentify.scss';

import PanigationProduct from '../../../components/PanigationProduct';

function ProductIdentify() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = numPageProduct;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ priceRange: null, sortOption: null });

  // Gọi hook ở cấp cao nhất
  const { products, loading, error, totalPages} = useProductsByCategory({
    categorySlug,
    page,
    pageSize,
  });
  if (loading) return <Loading loading={loading} />;
  if (error) return <Navigate to="/error" />;

  const handlePaginationChange = (newPage, newPageSize) => {
    setSearchParams({ page: newPage.toString(), pageSize: newPageSize.toString() });
  };

  const handleProductsChange = (newProducts) => {
    setFilteredProducts(newProducts);
  };

  const handleFilterChange = ({ priceRange, sortOption }) => {
    setFilters({ priceRange, sortOption });
  };

  // Chọn danh sách sản phẩm để hiển thị
  const displayProducts = filters.priceRange || filters.sortOption ? filteredProducts : products;

  return (
    <div className="products-container">
      <CategoriesHeader />
      <FilterSection
        onProductsChange={handleProductsChange}
        onFilterChange={handleFilterChange}
        categorySlug={categorySlug}
      />
      <PanigationProduct
        products={displayProducts}
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