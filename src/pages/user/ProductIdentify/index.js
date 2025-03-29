import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import useProductsByCategory from '../../../hook/useProductsByCategory';
import FilterSection from '../../../components/FilterCommon';
import CategoriesHeader from '../../../components/CategoriesHeader';
import ShowProduct from '../../../components/ShowProduct';
import './ProductIdentify.scss';

function ProductIdentify() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { products: defaultProducts, loading, error } = useProductsByCategory(categorySlug);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ priceRange: null, sortOption: null });

  // Xử lý loading và error
  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate('/error');
    return null;
  }

  const handleProductsChange = (newProducts) => {
    setFilteredProducts(newProducts);
  };

  const handleFilterChange = ({ priceRange, sortOption }) => {
    setFilters({ priceRange, sortOption });
  };

  // Hiển thị sản phẩm: ưu tiên filteredProducts nếu có filter, ngược lại dùng defaultProducts
  const displayProducts =
    filters.priceRange || filters.sortOption ? filteredProducts : defaultProducts;

  return (
    <div className="products-container">
      <CategoriesHeader />
      <FilterSection
        onProductsChange={handleProductsChange}
        onFilterChange={handleFilterChange}
        categorySlug={categorySlug}
      />
      <ShowProduct products={displayProducts} />
    </div>
  );
}

export default ProductIdentify;